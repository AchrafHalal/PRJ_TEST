<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\GoalController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/user/setup', [UserProfileController::class, 'store']);
    Route::get('/user/profile', [UserProfileController::class, 'show']);
    Route::get('/user/monthly-summary', [UserProfileController::class, 'monthlySummary']);
    Route::get('/expenses/overview', [UserProfileController::class, 'overview']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/listTransaction', [TransactionController::class, 'index']);
    Route::delete('/deleteTransaction/{id}', [TransactionController::class, 'destroy']);
    Route::get('/viewTransaction/{id}', [TransactionController::class, 'viewTransaction']); 
    Route::put('/updateTransaction/{id}', [TransactionController::class, 'update']);
    Route::get('/notifications', [NotificationController::class, 'getNotifications']);
    Route::get('/report/view/{year?}/{month?}', [ReportController::class, 'viewPdfReport']);
    Route::get('/report/download', [ReportController::class, 'downloadPdfReport']);
    Route::get('/reports/months', [ReportController::class, 'availableMonths']);
    Route::get('/reports/{year}/{month}', [ReportController::class, 'monthlyReport']);
     Route::get('/goals', [GoalController::class, 'index']);        
    Route::post('/goals', [GoalController::class, 'store']);        
    Route::get('/goals/{id}', [GoalController::class, 'show']);     
    Route::put('/goals/{id}', [GoalController::class, 'update']);   
    Route::delete('/goals/{id}', [GoalController::class, 'destroy']);
});

Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index']);
    Route::get('/users', [AdminController::class, 'listUsers']);
    Route::get('/viewUser/{id}', [AdminController::class, 'viewUser']);
    Route::put('/promote/{id}', [AdminController::class, 'promoteUser']);
    Route::put('/depromote/{id}', [AdminController::class, 'depromoteUser']);
    Route::delete('/user/{id}', [AdminController::class, 'deleteUser']);
});

