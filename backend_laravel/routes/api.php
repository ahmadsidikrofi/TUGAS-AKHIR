<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EWSController;
use App\Http\Controllers\HeartrateController;
use App\Http\Controllers\NotesController;
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
Route::post('/forget-password', [AuthController::class, "ForgetPassword"]);


Route::middleware('api')->group(function () {
    // Patients
    Route::get('/patients', [PatientController::class, "PatientsData"]);
    Route::get('/patients/{slug}', [PatientController::class, "PatientsDataDetail"]);
    Route::get('/profile', [PatientController::class, "ProfilePatient"]);
    Route::put('/profile/{slug}', [PatientController::class, "UpdateProfile"]); // Perawat
    Route::put('/profile', [PatientController::class, "UpdateProfileMobile"]); // Pasien
    // Arduino
    Route::get('/patients-data', [PatientController::class, "SendPatientsToArduino"]);
    Route::get('/heartrate', [EWSController::class, "StoreEWS"]);

    // Web Chart
    Route::get('/heartrate-patient/{slug}', [EWSController::class, "HeartratePatientDetail"]);
    Route::get('/oxymeter-patient/{slug}', [EWSController::class, "OxymeterPatientDetail"]);

    // Mobile Chart
    Route::get('/heartrate-patient-mobile', [EWSController::class, "HeartratePatientMobileDetail"]);

    // Notification WEB
    Route::get('/notifications', [EWSController::class, "EWSNotification"]);
    // Notification Mobile
    Route::get('/notifications-mobile', [EWSController::class, "EWSNotificationMobile"]);

    // Notes WEB
    Route::get('/notes/{slug}', [NotesController::class, "GetNotesData"]);
    Route::post('/notes/{slug}', [NotesController::class, "StoreNote"]);
    Route::put('/notes/{id}', [NotesController::class, "UpdateNote"]);
    Route::delete('/notes/{id}', [NotesController::class, "DeleteNotes"]);

    // Notes Mobile
    Route::get('/notes-mobile', [NotesController::class, "GetNotesMobile"]);
});
