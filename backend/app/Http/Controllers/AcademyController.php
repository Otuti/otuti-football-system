<?php

namespace App\Http\Controllers;

use App\Models\AcademyPlayer;
use App\Models\Player;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class AcademyController extends Controller
{
    public function index(Request $request)
    {
        $query = AcademyPlayer::query();
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('age_category', 'like', '%' . $request->category . '%');
        }
        return response()->json($query->orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'academy_id' => 'nullable|string|max:100',
            'age_category' => 'required|string',
            'dob' => 'nullable|date',
            'position' => 'nullable|string',
            'jersey' => 'nullable|integer',
            'school' => 'nullable|string',
            'guardian_name' => 'nullable|string',
            'guardian_phone' => 'nullable|string',
            'village' => 'nullable|string',
            'academic_grade' => 'nullable|string',
            'joined' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $player = AcademyPlayer::create($validated);

        ActivityLog::create([
            'user' => $request->user()->name ?? 'Staff',
            'role' => $request->user()->role ?? 'Coach',
            'action' => 'Enrolled youth scholar: ' . $player->full_name . ' (' . $player->age_category . ')',
            'type' => 'create',
        ]);

        return response()->json($player, 201);
    }

    public function show(AcademyPlayer $academy)
    {
        return response()->json($academy);
    }

    public function update(Request $request, AcademyPlayer $academy)
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|required|string|max:255',
            'academy_id' => 'nullable|string',
            'age_category' => 'nullable|string',
            'dob' => 'nullable|date',
            'position' => 'nullable|string',
            'jersey' => 'nullable|integer',
            'school' => 'nullable|string',
            'guardian_name' => 'nullable|string',
            'guardian_phone' => 'nullable|string',
            'village' => 'nullable|string',
            'academic_grade' => 'nullable|string',
            'joined' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $academy->update($validated);

        ActivityLog::create([
            'user' => $request->user()->name ?? 'Staff',
            'role' => $request->user()->role ?? 'Coach',
            'action' => 'Updated youth scholar: ' . $academy->full_name,
            'type' => 'update',
        ]);

        return response()->json($academy);
    }

    public function destroy(Request $request, AcademyPlayer $academy)
    {
        $name = $academy->full_name;
        $academy->delete();

        ActivityLog::create([
            'user' => $request->user()->name ?? 'Staff',
            'role' => $request->user()->role ?? 'Coach',
            'action' => 'Deleted academy player record: ' . $name,
            'type' => 'delete',
        ]);

        return response()->json(['message' => 'Academy player record deleted']);
    }

    public function promote(Request $request, AcademyPlayer $academy)
    {
        $seniorPlayer = Player::create([
            'name' => $academy->full_name,
            'jersey_number' => $academy->jersey ?? 99,
            'position' => $academy->position ?? 'Forward',
            'nationality' => 'Ugandan',
            'team' => 'Senior',
            'status' => 'Active',
            'phone' => $academy->guardian_phone,
            'joined_date' => now()->toDateString(),
        ]);

        $academy->update(['status' => 'Graduated to Senior']);

        ActivityLog::create([
            'user' => $request->user()->name ?? 'Admin',
            'role' => $request->user()->role ?? 'Admin',
            'action' => 'Promoted academy scholar ' . $academy->full_name . ' to Senior Team',
            'type' => 'update',
        ]);

        return response()->json([
            'message' => 'Player promoted successfully to Senior Team',
            'senior_player' => $seniorPlayer,
            'academy_player' => $academy
        ]);
    }
}
