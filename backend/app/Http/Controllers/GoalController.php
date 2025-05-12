<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GoalController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $goals = Goal::where('user_id', $user->id)->get();

        return response()->json($goals);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'saved_amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $goal = Goal::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'target_amount' => $validated['target_amount'],
            'saved_amount' => $validated['saved_amount'] ?? 0,
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json(['message' => 'Goal created successfully.', 'goal' => $goal], 201);
    }

    public function show($id)
    {
        $goal = Goal::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        return response()->json($goal);
    }

    public function update(Request $request, $id)
    {
        $goal = Goal::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'saved_amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $goal->update($validated);

        return response()->json(['message' => 'Goal updated successfully.', 'goal' => $goal]);
    }

    public function destroy($id)
    {
        $goal = Goal::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $goal->delete();

        return response()->json(['message' => 'Goal deleted successfully.']);
    }
}
