<?php

namespace App\Http\Controllers;

use App\Models\Sponsor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SponsorController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Sponsor::orderBy('start_date', 'desc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'support_type' => 'nullable|string',
            'pledged' => 'nullable|numeric|min:0',
            'received' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $sponsor = Sponsor::create($validated);
        return response()->json($sponsor, 201);
    }

    public function show(Sponsor $sponsor): JsonResponse
    {
        return response()->json($sponsor);
    }

    public function update(Request $request, Sponsor $sponsor): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'contact' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'support_type' => 'nullable|string',
            'pledged' => 'nullable|numeric|min:0',
            'received' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $sponsor->update($validated);
        return response()->json($sponsor);
    }

    public function destroy(Sponsor $sponsor): JsonResponse
    {
        $sponsor->delete();
        return response()->json(['message' => 'Sponsor record deleted successfully.']);
    }
}
