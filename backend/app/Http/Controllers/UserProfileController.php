<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProfile;
use App\Models\Goal;
use Carbon\Carbon;
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
            $validated
        );

        $user->has_completed_setup = true;
        $user->save();

        if ($request->filled(['name', 'target_amount', 'saved_amount'])) {
            Goal::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'target_amount' => $request->target_amount,
                'saved_amount' => $request->saved_amount,
                'notes' => $request->notes,
            ]);
        }



        return response()->json([
            'message' => 'Profile setup saved successfully.',
            'profile' => $profile,
        ]);
    }


   public function show()
{
    $user = Auth::user();

    if ($user->role === 'admin') {
        return response()->json([
            'profile' => [
                'user' => [
                    'firstName' => $user->first_name,
                    'role' => $user->role,
                    'email' => $user->email,
                ]
            ]
        ]);
    }

    $profile = UserProfile::where('user_id', $user->id)->first();

    if (!$profile) {
        return response()->json(['message' => 'User profile not found'], 404);
    }

    $now = Carbon::now();

    $monthlyIncome = $profile->getCombinedTotalIncomeByMonth($now->month, $now->year);
    $monthlyExpenses = $profile->getCombinedTotalExpensesByMonth($now->month, $now->year);


    return response()->json([
        'profile' => $profile,
        'combined_total_income' => $profile->combined_total_income,
        'combined_total_expenses' => $profile->combined_total_expenses,
        'monthly_income' => $monthlyIncome,
        'monthly_expenses' => $monthlyExpenses,
        'net_balance' => $profile->net_balance,

    ]);
}


    public function monthlySummary()
    {
        $user = Auth::user();

        $transactions = $user->transactions()
            ->selectRaw('MONTH(date) as month, 
                     SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) as income, 
                     SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as expenses')
            ->groupByRaw('MONTH(date)')
            ->orderByRaw('MONTH(date)')
            ->get();

        // Format month number to month name (1 => January, etc.)
        $summary = $transactions->map(function ($transaction) {
            return [
                'month' => date('F', mktime(0, 0, 0, $transaction->month, 1)),
                'income' => (float) $transaction->income,
                'expenses' => (float) $transaction->expenses,
            ];
        });

        return response()->json($summary);
    }

    public function overview()
    {
        $user = Auth::user();
        $today = Carbon::today();
        $now = Carbon::now();
        $startOfWeek = Carbon::now()->startOfWeek();
        $startOfMonth = Carbon::now()->startOfMonth();

        $daily = $user->transactions()
            ->whereDate('date', $today)
            ->where('type', 'expense')
            ->sum('amount');

        $weekly = $user->transactions()
            ->whereBetween('date', [$startOfWeek, now()])
            ->where('type', 'expense')
            ->sum('amount');

        $profile = UserProfile::where('user_id', $user->id)->first();

        $monthly = $profile
            ? $profile->getCombinedTotalExpensesByMonth($now->month, $now->year)
            : $user->transactions()
            ->whereBetween('date', [$startOfMonth, now()])
            ->where('type', 'expense')
            ->sum('amount');

        $category_expenses = $profile
            ? $profile->getCategory($now->month, $now->year)
            : [];

        return response()->json([
            'daily' => (float) $daily,
            'weekly' => (float) $weekly,
            'monthly' => (float) $monthly,
            'category_expenses' => $category_expenses,
        ]);
    }
}
