<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AlbumController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FotoController;
use App\Http\Controllers\Api\LikeController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/login', 'AuthController@login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('albums', [AlbumController::class, 'index']);
Route::post('albums', [AlbumController::class, 'store']);
Route::get('albums/{id}', [AlbumController::class, 'show']);
Route::get('albums/{id}/edit', [AlbumController::class, 'edit']);
Route::put('albums/{id}/edit', [AlbumController::class, 'update']);
Route::delete('albums/{id}/delete', [AlbumController::class, 'destroy']);

Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'store']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::get('users/{id}/edit', [UserController::class, 'edit']);
Route::put('users/{id}/edit', [UserController::class, 'update']);
Route::delete('users/{id}/delete', [UserController::class, 'destroy']);

Route::get('fotos', [FotoController::class, 'index']);
Route::post('fotos', [FotoController::class, 'store']);
Route::get('fotos/{id}', [FotoController::class, 'show']);
Route::get('fotos/{id}/edit', [FotoController::class, 'edit']);
Route::put('fotos/{id}/edit', [FotoController::class, 'update']);
Route::delete('fotos/{id}/delete', [FotoController::class, 'destroy']);

Route::get('likes', [LikeController::class, 'index']);
Route::post('likes', [LikeController::class, 'store']);
Route::get('likes/{id}', [LikeController::class, 'show']);
Route::get('likes/{id}/edit', [LikeController::class, 'edit']);
Route::put('likes/{id}/edit', [LikeController::class, 'update']);
Route::delete('likes/{id}/delete', [LikeController::class, 'destroy']);
