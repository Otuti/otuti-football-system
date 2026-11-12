<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::select('id', 'full_name', 'username', 'email', 'role', 'department', 'phone', 'active', 'created_at')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($users);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'username' => 'required|string|unique:users,username|max:50',
            'email' => 'nullable|email|max:100',
            'role' => 'required|string',
            'department' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:50',
            'password' => 'required|string|min:8',
        ]);

        $validated['username'] = strtolower(trim($validated['username']));
        $validated['password'] = Hash::make($validated['password']);
        $validated['active'] = true;

        $user = User::create($validated);

        return response()->json([
            'id' => $user->id,
            'full_name' => $user->full_name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'department' => $user->department,
            'phone' => $user->phone,
            'active' => $user->active,
        ], 201);
    }

    public function updateStatus(Request $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'You cannot deactivate your own account.'], 400);
        }

        $request->validate(['active' => 'required|boolean']);
        $user->update(['active' => $request->active]);

        return response()->json(['message' => 'Account status updated successfully.']);
    }

    public function resetPassword(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'password' => 'required|string|min:8',
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        \App\Models\ActivityLog::create([
            'user_id' => $request->user()->id,
            'username' => $request->user()->username,
            'full_name' => $request->user()->full_name,
            'role' => $request->user()->role,
            'type' => 'update',
            'action' => "Super Admin reset password for user @{$user->username} ({$user->full_name})",
        ]);

        return response()->json([
            'message' => "Password for user @{$user->username} has been reset successfully."
        ]);
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'You cannot delete your own account.'], 400);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully.']);
    }
}
