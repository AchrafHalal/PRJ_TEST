<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
    /**
     * Store or update user setup info.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'salary' => 'required|numeric',
            'otherIncome' => 'nullable|numeric',
            'rent' => 'nullable|numeric',
            'utilities' => 'nullable|numeric',
            'transport' => 'nullable|numeric',
            'groceries' => 'nullable|numeric',
            'insurance' => 'nullable|numeric',
            'entertainment' => 'nullable|numeric',
            'subscriptions' => 'nullable|numeric',
            'savingsGoal' => 'nullable|string|max:255',
            'savingsTarget' => 'nullable|numeric',
        ]);


        $profile = UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($validated, ['setup_completed' => true])
        );

        

        return response()->json([
            'message' => 'Profile setup saved successfully.',
            'profile' => $profile,
        ]);
    }

    /**
     * Show the user profile (if needed).
     */
    public function show()
{
    $user = Auth::user();
    $profile = UserProfile::where('user_id', $user->id)->first();

    if (!$profile) {
        return response()->json(['message' => 'User profile not found'], 404);
    }

    return response()->json([
        'profile' => $profile,
        'combined_total_income' => $profile->combined_total_income,
        'combined_total_expenses' => $profile->combined_total_expenses,
    ]);
}


}
