<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EWSController;
use App\Http\Controllers\HeartrateController;
use App\Http\Controllers\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function() {
    return response()->json([
        'success' => true,
        'message' => 'Testing API Berhasil'
    ]);
});

// AUTH
Route::post('/signup', [AuthController::class, "SignupPasien"]);
Route::post('/signin', [AuthController::class, "SigninPasien"]);
Route::get('/logged-in/{token}', [AuthController::class, "IsLoggedIn"]);
Route::put('/profile-update/{slug}', [AuthController::class, "UpdateProfile"]);
Route::post('/forget-password', [AuthController::class, "ForgetPassword"]);


Route::middleware('api')->group(function () {
    // Patients
    Route::get('/patients-data', [PatientController::class, "SendPatientsToArduino"]);
    Route::get('/heartrate', [EWSController::class, "StoreHeartRate"]);
    Route::get('/patients', [PatientController::class, "PatientsData"]);
});
