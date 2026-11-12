<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Player::orderBy('jersey', 'asc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'player_id' => 'nullable|string|max:100',
            'jersey' => 'nullable|integer',
            'position' => 'required|string',
            'team' => 'nullable|string',
            'dob' => 'nullable|date',
            'phone' => 'nullable|string|max:50',
            'joined' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $player = Player::create($validated);
        return response()->json($player, 201);
    }

    public function show(Player $player): JsonResponse
    {
        return response()->json($player);
    }

    public function update(Request $request, Player $player): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|required|string|max:255',
            'player_id' => 'nullable|string|max:100',
            'jersey' => 'nullable|integer',
            'position' => 'nullable|string',
            'team' => 'nullable|string',
            'dob' => 'nullable|date',
            'phone' => 'nullable|string|max:50',
            'joined' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $player->update($validated);
        return response()->json($player);
    }

    public function destroy(Player $player): JsonResponse
    {
        $player->delete();
        return response()->json(['message' => 'Player record deleted successfully.']);
    }
}
