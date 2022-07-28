<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\productController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [userController::class, 'register']);
Route::post('login', [userController::class, 'login']);
Route::post('addProduct', [productController::class, "addProducts"]);
Route::get('getProducts', [productController::class, "list"]);
Route::delete('delete/{id}', [productController::class, "delete"]);
Route::get('product/{id}', [productController::class, "getProduct"]);
Route::put('update/{id}', [productController::class, "updateProduct"]);
Route::get('search/{key}', [productController::class, 'search']);
