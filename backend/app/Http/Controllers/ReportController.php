<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ReportController extends Controller
{


    public function viewPdfReport(Request $request)
    {
        $user = auth()->user();
        $transactions = $user->transactions;
        $pdf = Pdf::loadView('reports.user-report', compact('user', 'transactions'));

        return $pdf->stream('report.pdf');
    }

    public function downloadPdfReport(Request $request)
    {
        $user = auth()->user();
        $transactions = $user->transactions;

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('reports.user-report', compact('user', 'transactions'));

        return $pdf->stream('report.pdf');
    }
}
