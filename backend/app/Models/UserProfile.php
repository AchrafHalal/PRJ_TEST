<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'salary',
        'otherIncome',
        'rent',
        'utilities',
        'transport',
        'groceries',
        'insurance',
        'entertainment',
        'subscriptions',
        'savingsGoal',
        'savingsTarget',
        'setup_completed',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getTotalIncomeAttribute()
    {
        return ($this->salary ?? 0) + ($this->otherIncome ?? 0);
    }

    public function getTotalExpensesAttribute()
    {
        return ($this->rent ?? 0)
            + ($this->groceries ?? 0)
            + ($this->utilities ?? 0)
            + ($this->transport ?? 0)
            + ($this->subscriptions ?? 0)
            + ($this->insurance ?? 0)
            + ($this->entertainment ?? 0);
    }

    public function getCombinedTotalIncomeAttribute()
    {
        $transactionIncome = $this->user
            ? $this->user->transactions()->where('type', 'income')->sum('amount')
            : 0;

        return $this->total_income + $transactionIncome;
    }

    public function getCombinedTotalExpensesAttribute()
    {
        $transactionExpenses = $this->user
            ? $this->user->transactions()->where('type', 'expense')->sum('amount')
            : 0;

        return $this->total_expenses + $transactionExpenses;
    }

    public function getCombinedTotalIncomeByMonth($month, $year)
    {
        $transactionIncome = $this->user
            ? $this->user->transactions()
            ->where('type', 'income')
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->sum('amount')
            : 0;

        return $this->total_income + $transactionIncome;
    }

    public function getCombinedTotalExpensesByMonth($month, $year)
    {
        $transactionExpenses = $this->user
            ? $this->user->transactions()
            ->where('type', 'expense')
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->sum('amount')
            : 0;

        return $this->total_expenses + $transactionExpenses;
    }

    public function getCategory($month, $year)
    {
        if (!$this->user) {
            return [];
        }

        $transactions = $this->user->transactions()
            ->whereMonth('date', $month)
            ->whereYear('date', $year)
            ->get();

        $categories = [
            'Necessaries' => ['Rent', 'Utilities'],
            'Entertainement' => ['Entertainement', 'Shoping'],
            'Transportation' => ['Transport'],
            'Food' => ['Food & Health'],
            'Subscriptions' => ['Subscriptions'],
        ];

        $totals = [];
        $overallTotal = 0;

        foreach ($categories as $label => $cats) {
            $sum = $transactions->whereIn('category', $cats)->sum('amount');
            $totals[$label] = $sum;
            $overallTotal += $sum;
        }

        $categorySums = [];
        foreach ($totals as $label => $amount) {
            $categorySums[] = [
                'name' => $label,
                'amount' => round($amount, 2),
                'fill' => $this->getCategoryColor($label),
            ];
        }

        return $categorySums;
    }

    public function getCategoryColor($category)
    {
        return match ($category) {
            'Necessaries' => '#4caf50',
            'Entertainment' => '#f44336',
            'Transportation' => '#2196f3',
            'Food' => '#ff9800',
            'Subscriptions' => '#9c27b0',
            default => '#9e9e9e',
        };
    }

    public function getNetBalanceAttribute()
    {
        return $this->combined_total_income - $this->combined_total_expenses;
    }
}
