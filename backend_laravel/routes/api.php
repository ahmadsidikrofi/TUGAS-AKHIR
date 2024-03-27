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
// Route::get('/logged-in/{token}', [AuthController::class, "IsLoggedIn"]);
Route::get('/logged-in', [AuthController::class, "IsLoggedIn"]);
Route::put('/profile-update/{slug}', [AuthController::class, "UpdateProfile"]);
Route::post('/forget-password', [AuthController::class, "ForgetPassword"]);


Route::middleware('api')->group(function () {
    // Patients
    // Arduino
    Route::get('/patients-data', [PatientController::class, "SendPatientsToArduino"]);
    Route::get('/heartrate', [EWSController::class, "StoreHeartRate"]);
    // Web Chart
    Route::get('/patients', [PatientController::class, "PatientsData"]);
    Route::get('/patients/{slug}', [PatientController::class, "PatientsDataDetail"]);
    Route::get('/heartrate-patient/{slug}', [EWSController::class, "HeartratePatientDetail"]);
    // Route::get('/heartrate-patient', [EWSController::class, "HeartRatePatient"]);
    Route::delete('/delete-100-heartrate', [EWSController::class, "Delete100Heartrate"]);
    Route::get('/oxymeter-patient/{slug}', [EWSController::class, "OxymeterPatientDetail"]);
});
