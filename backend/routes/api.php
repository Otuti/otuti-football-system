<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AcademyController;

/*
|--------------------------------------------------------------------------
| Daystar United FC API Routes - Role-Enforced Security
|--------------------------------------------------------------------------
*/

// Public Health Check & Public Content
Route::get('/health', function () {
    return response()->json([
        'status' => 'online',
        'service' => 'Daystar United FC Management API',
        'version' => '1.0.0',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::get('/public/articles', [ArticleController::class, 'index']);
Route::get('/public/articles/{article}', [ArticleController::class, 'show']);

// Authentication
Route::post('/login', [AuthController::class, 'login']);

// Authenticated Routes with Strict Role Isolation
Route::middleware('auth:sanctum')->group(function () {
    // Current User Session
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Dashboard Overview (Aggregates filtered strictly per role)
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // 1. Financial Scope: Contributions, Expenses, Sponsors (Admin, Treasurer Only)
    Route::middleware('role:Admin,Treasurer')->group(function () {
        Route::apiResource('contributions', ContributionController::class);
        Route::apiResource('expenses', ExpenseController::class);
        Route::apiResource('sponsors', SponsorController::class);
    });

    // 2. Football Scope: Players, Matches, Staff (Admin, Team Manager Only)
    Route::middleware('role:Admin,Team Manager')->group(function () {
        Route::apiResource('players', PlayerController::class);
        Route::apiResource('matches', MatchController::class);
        Route::apiResource('staff', StaffController::class);
    });

    // 3. Secretariat Scope: Members & Profile (Admin, Secretary Only)
    Route::middleware('role:Admin,Secretary')->group(function () {
        Route::apiResource('members', MemberController::class);
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::put('/profile', [ProfileController::class, 'update']);
    });

    // 4. Events, Activities & Academy (Admin, Team Manager, Secretary)
    Route::middleware('role:Admin,Team Manager,Secretary')->group(function () {
        Route::apiResource('activities', ActivityController::class);
        Route::apiResource('articles', ArticleController::class);
        Route::apiResource('academy', AcademyController::class);
        Route::post('/academy/{academy}/promote', [AcademyController::class, 'promote']);
    });

    // 5. Super Admin / CEO Exclusive Scope: Users, Settings & System Activity Log
    Route::middleware('role:Admin,Super Administrator,Club CEO')->group(function () {
        Route::get('/activity-logs', [ActivityLogController::class, 'index']);
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::patch('/users/{user}/status', [UserController::class, 'updateStatus']);
        Route::post('/users/{user}/reset-password', [UserController::class, 'resetPassword']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });
});
