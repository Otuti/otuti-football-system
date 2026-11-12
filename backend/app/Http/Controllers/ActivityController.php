<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Activity::orderBy('date', 'desc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'category' => 'nullable|string',
            'venue' => 'nullable|string',
            'lead' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'attendance' => 'nullable|integer',
            'status' => 'nullable|string',
            'details' => 'nullable|string',
        ]);

        $activity = Activity::create($validated);
        return response()->json($activity, 201);
    }

    public function show(Activity $activity): JsonResponse
    {
        return response()->json($activity);
    }

    public function update(Request $request, Activity $activity): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'date' => 'sometimes|required|date',
            'category' => 'nullable|string',
            'venue' => 'nullable|string',
            'lead' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'attendance' => 'nullable|integer',
            'status' => 'nullable|string',
            'details' => 'nullable|string',
        ]);

        $activity->update($validated);
        return response()->json($activity);
    }

    public function destroy(Activity $activity): JsonResponse
    {
        $activity->delete();
        return response()->json(['message' => 'Activity deleted successfully.']);
    }
}
