<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContributionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Contribution::orderBy('date', 'desc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'supporter' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'category' => 'nullable|string',
            'purpose' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'paid' => 'nullable|numeric|min:0',
            'method' => 'nullable|string',
            'reference' => 'nullable|string',
            'received_by' => 'nullable|string',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $paid = $validated['paid'] ?? 0;
        $amount = $validated['amount'];
        $validated['status'] = $paid >= $amount ? 'Paid' : ($paid > 0 ? 'Partially paid' : ($validated['status'] ?? 'Pledged'));

        $contribution = Contribution::create($validated);
        return response()->json($contribution, 201);
    }

    public function show(Contribution $contribution): JsonResponse
    {
        return response()->json($contribution);
    }

    public function update(Request $request, Contribution $contribution): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'sometimes|required|date',
            'supporter' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'category' => 'nullable|string',
            'purpose' => 'sometimes|required|string',
            'amount' => 'sometimes|required|numeric|min:0',
            'paid' => 'nullable|numeric|min:0',
            'method' => 'nullable|string',
            'reference' => 'nullable|string',
            'received_by' => 'nullable|string',
            'status' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $contribution->update($validated);
        return response()->json($contribution);
    }

    public function destroy(Contribution $contribution): JsonResponse
    {
        $contribution->delete();
        return response()->json(['message' => 'Contribution record deleted successfully.']);
    }
}
