<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Transaction;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Welcome to the admin dashboard.',
            'user_count' => User::count(),
            'users' => User::all()
        ]);
    }

    public function listUsers()
    {
        $users = User::whereIn('role', ['admin', 'user'])
                                ->where('id', '!=', auth()->user()->id)
                                ->get(['id', 'firstName', 'lastName', 'email', 'role', 'is_active']);

        return response()->json([
            'users' => $users
        ]);
    }

    public function listAdmins()
    {
        $admins = User::where('role', 'admin')->get();

        return response()->json([
            'admins' => $admins
        ]);
    }

    public function ViewUser(Request $request, $id)
    {
        $user = User::where('id', $id)->get();

        return response()->json([
            'user' => $user
        ]);
    }


    public function promoteUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->role = 'admin';
        $user->save();

        return response()->json([
            'message' => 'User promoted to admin.',
            'user' => $user
        ]);
    }

    public function depromoteUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->role = 'user';
        $user->save();

        return response()->json([
            'message' => 'User depromoted to user.',
            'user' => $user
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->transactions()->delete();
        $user->delete();

        return response()->json([
            'message' => 'User deleted.',
        ]);
    }

    public function userStats()
    {
        $totalUsers = User::count();

        $activeUsers = User::where('last_login_at', '>=', now()->subDays(7))->count();
        $newUsers = User::whereDate('created_at', today())->count();

        return response()->json([
            'totalUsers' => $totalUsers,
            'activeUsers' => $activeUsers,
            'newUsers' => $newUsers,
        ]);
    }

    public function getOverview()
    {
        $currentMonthCount = Transaction::whereBetween('created_at', [
            Carbon::now()->startOfMonth(),
            Carbon::now()->endOfMonth(),
        ])->count();

        $lastMonthCount = Transaction::whereBetween('created_at', [
            Carbon::now()->subMonth()->startOfMonth(),
            Carbon::now()->subMonth()->endOfMonth(),
        ])->count();

        $growthRate = 0;
        if ($lastMonthCount > 0) {
            $growthRate = (($currentMonthCount - $lastMonthCount) / $lastMonthCount) * 100;
        } elseif ($currentMonthCount > 0) {
            $growthRate = 100;
        }
        return response()->json([
            'transactions' => Transaction::count(),
            'growth_rate' => '52%',
            'active_users' => User::where('last_login_at', '>=', now()->subDays(7))->count(),
        ]);
    }

    public function monthlyUserRegistrations()
    {
        $currentYear = Carbon::now()->year;

        $registrations = DB::table('users')
            ->select(DB::raw("DATE_FORMAT(created_at, '%b') as month"), DB::raw('COUNT(*) as users'))
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw("DATE_FORMAT(created_at, '%b')"))
            ->orderBy(DB::raw("MONTH(created_at)"))
            ->get();

        return response()->json([
            'data' => $registrations
        ]);
    }

    public function activateUser($id)
    {
        $user = User::findOrFail($id);
        $user->is_active = true;
        $user->save();

        return response()->json([
            'message' => 'User has been activated.',
            'user' => $user
        ]);
    }

    public function deactivateUser($id)
    {
        $user = User::findOrFail($id);
        $user->is_active = false;
        $user->save();

        return response()->json([
            'message' => 'User has been deactivated.',
            'user' => $user
        ]);
    }
}
