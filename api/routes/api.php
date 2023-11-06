<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
    Route::put('/update', [AuthController::class, 'updateUser'])->middleware('auth:sanctum');
    Route::delete('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::prefix('product')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [ProductController::class, 'getAll']);
    Route::get('/{product}', [ProductController::class, 'findOne']);
    Route::post('/', [ProductController::class, 'add']);
    Route::put('/{id}', [ProductController::class, 'update'])->middleware('admin');
    Route::delete('/{id}', [ProductController::class, 'delete'])->middleware('admin');
});

Route::prefix('category')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [CategoryController::class, 'getAll']);
    Route::get('/{category}', [CategoryController::class, 'findOne']);
    Route::post('/', [CategoryController::class, 'add']);
    Route::put('/{id}', [CategoryController::class, 'update'])->middleware('admin');
    Route::delete('/{id}', [CategoryController::class, 'delete'])->middleware('admin');
});
