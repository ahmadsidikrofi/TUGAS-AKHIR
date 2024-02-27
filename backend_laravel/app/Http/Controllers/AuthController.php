<?php

namespace App\Http\Controllers;

use App\Models\PasienModel;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function SignupPasien( Request $request )
    {
        $valid = Validator::make($request->all(), [
            'email' => 'required|unique:users,email',
            'nama_lengkap' => 'required',
            'password' => 'required|min:7',
        ], [
            'email.required' => 'Email wajib diisi',
            'email.unique' => 'Email sudah terdaftar',
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

        $checkEmail = PasienModel::where('email', $request->email)->first();
        if ($checkEmail) {
            return response()->json([
                'success' => false,
                'message' => 'Email pasien sudah terdaftar'
            ], 404);
        }

        $pasienBaru = PasienModel::create([
            'nama_lengkap' => $request->input('nama_lengkap'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60)
        ]);
        if ($pasienBaru) {
            return response()->json([
                'success' => true,
                'message' => 'Pasien berhasil didaftarkan'
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
        if (auth()->attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
            $pasienLogin = PasienModel::where('email', $request->input('email'))->first();
            $pasienLogin->is_login = 1;
            $pasienLogin->save();
            $pasienSlug = auth()->user()->slug;

            return response()->json([
                'success' => true,
                'message' => 'Kamu berhasil login',
                'user' => auth()->user(),
                'pasienSlug' => $pasienSlug
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => "Sepertinya ada yang salah dengan email / password kamu"
            ], 404);
        };
    }
    // public function IsLoggedIn(Request $request)
    // {
    //     if (Session::has('user_slug')) {
    //         // Pengguna telah login
    //         return response()->json([
    //             'logged_in' => true,
    //             'user_slug' => Session::get('user_slug')
    //         ], 200);
    //     } else {
    //         // Pengguna tidak login
    //         return response()->json([
    //             'logged_in' => false,
    //             'message' => 'Pengguna tidak login'
    //         ], 401);
    //     }
    // }

    public function IsLoggedIn($slug)
    {
        $pasien = PasienModel::where('slug', $slug)->first();
        // $pasien = PasienModel::find($id);
        if ( $pasien->is_login === 1 ) {
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'pasien_data' => $pasien
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login',
                'is_login' => $pasien->is_login,
            ], 401);
        }
    }
    public function UpdateProfile( Request $request, $slug )
    {
        $pasienProfile = PasienModel::where('slug', $slug)->first();
        $pasienProfile->update($request->all());
        if ($pasienProfile->wasChanged()) {
            return response()->json([
                'success' => true,
                'message' => 'Profilemu berhasil diubah'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Profilemu tidak ada perubahan'
            ], 500);
        }
    }

    public function ForgetPassword( Request $request )
    {
        $valid = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required|min:5',
        ], [
            'email.required' => 'Email wajib diisi',
            'password.min' => 'Panjang password minimal 5 karakter',
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
            $pasien = PasienModel::where('email', $request->email)->first();
            if ( !$pasien ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email pasien tidak ditemukan!'
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
}
