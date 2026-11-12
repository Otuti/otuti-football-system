<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Staff::orderBy('role', 'asc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'department' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'start_date' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $staff = Staff::create($validated);
        return response()->json($staff, 201);
    }

    public function show(Staff $staff): JsonResponse
    {
        return response()->json($staff);
    }

    public function update(Request $request, Staff $staff): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|required|string|max:255',
            'role' => 'sometimes|required|string|max:255',
            'department' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'start_date' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $staff->update($validated);
        return response()->json($staff);
    }

    public function destroy(Staff $staff): JsonResponse
    {
        $staff->delete();
        return response()->json(['message' => 'Staff member deleted successfully.']);
    }
}
