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
}
