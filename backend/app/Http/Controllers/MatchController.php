<?php

namespace App\Http\Controllers;

use App\Models\MatchFixture;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(MatchFixture::orderBy('date', 'desc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'opponent' => 'required|string|max:255',
            'competition' => 'nullable|string',
            'venue' => 'nullable|string',
            'type' => 'nullable|string',
            'home_away' => 'nullable|string',
            'daystar_goals' => 'nullable|integer',
            'opponent_goals' => 'nullable|integer',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if (isset($validated['daystar_goals']) && isset($validated['opponent_goals'])) {
            $validated['status'] = $validated['status'] ?? 'Played';
        }

        $match = MatchFixture::create($validated);
        return response()->json($match, 201);
    }

    public function show(MatchFixture $match): JsonResponse
    {
        return response()->json($match);
    }

    public function update(Request $request, MatchFixture $match): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'sometimes|required|date',
            'opponent' => 'sometimes|required|string|max:255',
            'competition' => 'nullable|string',
            'venue' => 'nullable|string',
            'type' => 'nullable|string',
            'home_away' => 'nullable|string',
            'daystar_goals' => 'nullable|integer',
            'opponent_goals' => 'nullable|integer',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $match->update($validated);
        return response()->json($match);
    }

    public function destroy(MatchFixture $match): JsonResponse
    {
        $match->delete();
        return response()->json(['message' => 'Match fixture deleted successfully.']);
    }
}
