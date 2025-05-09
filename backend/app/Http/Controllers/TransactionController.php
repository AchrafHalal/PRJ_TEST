<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;



use Illuminate\Http\Request;

class TransactionController extends Controller
{
    // List all transactions for the authenticated user
    public function index()
    {
        $user=Auth::user();
        return $user->transactions()->latest()->get();
    }

    public function viewTransaction($id)
    {
        $user=Auth::user();
        $transaction = $user->transactions()->where('id',$id)->get();

        return response()->json($transaction);
    }

    // Store a new transaction
    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount'      => 'required|numeric',
            'category'    => 'required|string|max:255',
            'type'        => 'required|in:income,expense',
            'date'        => 'required|date',
            'description' => 'nullable|string',
        ]);

        $transaction = auth()->user()->transactions()->create($validated);

        return response()->json([
            'message'     => 'Transaction stored successfully',
            'transaction' => $transaction,
        ], 201);
    }

    // Update an existing transaction
    public function update(Request $request, $id)
    {
        $transaction = auth()->user()->transactions()->findOrFail($id);

        $validated = $request->validate([
            'amount'      => 'sometimes|numeric',
            'category'    => 'sometimes|string|max:255', 
            'type'        => 'sometimes|in:income,expense',
            'date'        => 'sometimes|date',
            'description' => 'nullable|string',
        ]);

        $transaction->update($validated);

        return response()->json([
            'message'     => 'Transaction updated successfully',
            'transaction' => $transaction,
        ]);
    }

    // Delete a transaction
    public function destroy($id)
    {
        $transaction = auth()->user()->transactions()->findOrFail($id);
        $transaction->delete();

        return response()->json([
            'message' => 'Transaction deleted successfully',
        ]);
    }
}
