<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ReportController extends Controller
{


    public function viewPdfReport(Request $request, $year = null, $month = null)
{
    $user = auth()->user();

    // If year and month are provided, filter the transactions
    $transactions = $user->transactions();
    if ($year && $month) {
        $transactions = $transactions->whereYear('date', $year)->whereMonth('date', $month);
    }

    $transactions = $transactions->get();

    $profile = UserProfile::where('user_id', $user->id)->first();

    $incomeItems = [
        ['description' => 'Salary', 'amount' => $profile->salary ?? 0],
        ['description' => 'Other Income', 'amount' => $profile->otherIncome ?? 0],
    ];

    $expenseItems = [
        ['description' => 'Rent', 'amount' => $profile->rent ?? 0],
        ['description' => 'Utilities', 'amount' => $profile->utilities ?? 0],
        ['description' => 'Transport', 'amount' => $profile->transport ?? 0],
        ['description' => 'Groceries', 'amount' => $profile->groceries ?? 0],
        ['description' => 'Insurance', 'amount' => $profile->insurance ?? 0],
        ['description' => 'Entertainment', 'amount' => $profile->entertainment ?? 0],
        ['description' => 'Subscriptions', 'amount' => $profile->subscriptions ?? 0],
    ];

    $totalIncome = collect($incomeItems)->sum('amount');
    $totalExpense = collect($expenseItems)->sum('amount');

    $pdf = Pdf::loadView('reports.user-report', compact(
        'user',
        'transactions',
        'incomeItems',
        'expenseItems',
        'totalIncome',
        'totalExpense',
        'month',
        'year'
    ));

    return $pdf->stream('report.pdf');
}


    public function downloadPdfReport(Request $request)
    {
        return $this->viewPdfReport($request);
    }

    public function listReports()
    {
        $user = auth()->user();

        // Group transactions by month
        $monthlyReports = $user->transactions()
            ->selectRaw('YEAR(date) as year, MONTH(date) as month')
            ->groupByRaw('YEAR(date), MONTH(date)')
            ->orderByRaw('YEAR(date) DESC, MONTH(date) DESC')
            ->get();

        return view('reports.index', compact('monthlyReports'));
    }


    public function monthlyReport(Request $request, $year, $month)
    {
        $user = auth()->user();
        $transactions = $user->transactions()
            ->whereYear('date', $year)
            ->whereMonth('date', $month)
            ->get();

        $profile = UserProfile::where('user_id', $user->id)->first();

        $incomeItems = [
            ['description' => 'Salary', 'amount' => $profile->salary ?? 0],
            ['description' => 'Other Income', 'amount' => $profile->otherIncome ?? 0],
        ];

        $expenseItems = [
            ['description' => 'Rent', 'amount' => $profile->rent ?? 0],
            ['description' => 'Utilities', 'amount' => $profile->utilities ?? 0],
            ['description' => 'Transport', 'amount' => $profile->transport ?? 0],
            ['description' => 'Groceries', 'amount' => $profile->groceries ?? 0],
            ['description' => 'Insurance', 'amount' => $profile->insurance ?? 0],
            ['description' => 'Entertainment', 'amount' => $profile->entertainment ?? 0],
            ['description' => 'Subscriptions', 'amount' => $profile->subscriptions ?? 0],
        ];

        $totalIncome = collect($incomeItems)->sum('amount');
        $totalExpense = collect($expenseItems)->sum('amount');

        $pdf = Pdf::loadView('reports.user-report', compact(
            'user',
            'transactions',
            'incomeItems',
            'expenseItems',
            'totalIncome',
            'totalExpense',
            'month',
            'year'
        ));

        if ($request->has('download')) {
            return $pdf->download("report-{$year}-{$month}.pdf");
        }

        return $pdf->stream("report-{$year}-{$month}.pdf");
    }

    public function availableMonths()
    {
        $user = auth()->user();

        $months = $user->transactions()
            ->selectRaw('YEAR(date) as year, MONTH(date) as month')
            ->groupByRaw('YEAR(date), MONTH(date)')
            ->orderByRaw('YEAR(date) DESC, MONTH(date) DESC')
            ->get();

        return response()->json($months);
    }
}
