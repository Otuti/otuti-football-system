<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Member::orderBy('joined', 'desc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'member_no' => 'nullable|string|max:100',
            'category' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'area' => 'nullable|string|max:255',
            'joined' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $member = Member::create($validated);
        return response()->json($member, 201);
    }

    public function show(Member $member): JsonResponse
    {
        return response()->json($member);
    }

    public function update(Request $request, Member $member): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|required|string|max:255',
            'member_no' => 'nullable|string|max:100',
            'category' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'area' => 'nullable|string|max:255',
            'joined' => 'nullable|date',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $member->update($validated);
        return response()->json($member);
    }

    public function destroy(Member $member): JsonResponse
    {
        $member->delete();
        return response()->json(['message' => 'Member deleted successfully.']);
    }
}
