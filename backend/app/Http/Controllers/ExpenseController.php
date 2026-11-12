<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Expense::orderBy('date', 'desc')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'category' => 'required|string',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'paid_to' => 'nullable|string',
            'method' => 'nullable|string',
            'reference' => 'nullable|string',
            'approved_by' => 'nullable|string',
            'activity' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $expense = Expense::create($validated);
        return response()->json($expense, 201);
    }

    public function show(Expense $expense): JsonResponse
    {
        return response()->json($expense);
    }

    public function update(Request $request, Expense $expense): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'sometimes|required|date',
            'category' => 'sometimes|required|string',
            'description' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required|numeric|min:0',
            'paid_to' => 'nullable|string',
            'method' => 'nullable|string',
            'reference' => 'nullable|string',
            'approved_by' => 'nullable|string',
            'activity' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $expense->update($validated);
        return response()->json($expense);
    }

    public function destroy(Expense $expense): JsonResponse
    {
        $expense->delete();
        return response()->json(['message' => 'Expense record deleted successfully.']);
    }
}
