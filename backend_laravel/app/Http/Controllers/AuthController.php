<?php

namespace App\Http\Controllers;

use App\Models\HeartrateModel;
use App\Models\NibpModel;
use App\Models\OxygenSaturationModel;
use App\Models\PasienModel;
use App\Models\TemperatureModel;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function SignupPasien( Request $request )
    {
        $valid = Validator::make($request->all(), [
            'noHp' => 'required|min:11|max:12|unique:users,noHp',
            'nama_lengkap' => 'required',
            'password' => 'required|min:7',
        ], [
            'noHp.required' => 'No handphone wajib diisi',
            'noHp.unique' => 'Nomor ini sudah terdaftar',
            'noHp.min' => 'No handphone minimal 11 karakter',
            'noHp.max' => 'No handphone maksmimal 12 karakter',
            'nama_lengkap' => 'Nama lengkap wajib diisi',
            'password.required' => 'Password wajib dibuat',
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Sepertinya ada kesalahan dalam input data pasien',
                $valid->errors()
            ], 422);
        }

        $checkPhoneNumber = PasienModel::where('noHp', $request->noHp)->first();
        if ($checkPhoneNumber) {
            return response()->json([
                'success' => false,
                'message' => 'Email pasien sudah terdaftar'
            ], 404);
        }

        $pasienBaru = PasienModel::create([
            'nama_lengkap' => $request->input('nama_lengkap'),
            'noHp' => $request->input('noHp'),
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ]);
        $heartRate = HeartrateModel::create([
            'patient_id' => $pasienBaru->id,
            'heart_beats' => '0',
        ]);
        $oxygenSaturation = OxygenSaturationModel::create([
            'patient_id' => $pasienBaru->id,
            'blood_oxygen' => '0',
        ]);
        $temp = TemperatureModel::create([
            'patient_id' => $pasienBaru->id,
            'patient_temp' => '0'
        ]);
        if ($pasienBaru && $heartRate && $oxygenSaturation && $temp) {
            return response()->json([
                'success' => true,
                'message' => 'Pasien berhasil didaftarkan',
                'pasien' => $pasienBaru,
                'access_token' => auth()->login($pasienBaru),
                'type' => 'bearer',
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pasien gagal terdaftar'
            ], 401);
        }
    }

    public function SigninPasien( Request $request )
    {
        $token = auth()->attempt(['noHp' => $request->input('noHp'), 'password' => $request->input('password')]);
        if ($token) {
            $pasienLogin = PasienModel::where('noHp', $request->input('noHp'))->first();
            $pasienLogin->is_login = 1;
            $pasienLogin->save();
            return response()->json([
                'success' => true,
                'message' => 'Kamu berhasil login',
                'pasien' => auth()->user(),
                'access_token' => $token,
                'type' => 'bearer',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => "Sepertinya ada yang salah dengan email / password kamu"
            ], 404);
        };
    }


    public function LupaPassword( Request $request )
    {
        $valid = Validator::make($request->all(), [
            'noHp' => 'required',
            'password' => 'required|min:7',
        ], [
            'noHp.required' => 'No handphone wajib diisi',
            'password.min' => 'Panjang password minimal 7 karakter',
            'password.required' => 'Password wajib dibuat'
        ]);
        if ( $valid->fails() ) {
            return response()->json([
                'success' => false,
                'message' => 'Sepertinya ada kesalahan pada input data',
                'error' => $valid->errors(),
            ], 500);
        }

        if ( $valid ) {
            $pasien = PasienModel::where('noHp', $request->noHp)->first();
            if ( !$pasien ) {
                return response()->json([
                    'success' => false,
                    'message' => 'No handphone pasien tidak terdaftar!'
                ], 401);
            }
            $pasien->update([
                'password' => Hash::make($request->password)
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Password berhasil diubah'
            ], 200);
        }
    }

    public function LogoutPasien( Request $request )
    {
        $token = JWTAuth::getToken();
        $removeToken = JWTAuth::invalidate($token);
        if ($removeToken) {
            $user = $request->user();
            $user->update(['is_login' => 0]);
            return response()->json([
                'success' => true,
                'message' => 'Logout berhasil dilakukan!'
            ]);
        }
    }
}
