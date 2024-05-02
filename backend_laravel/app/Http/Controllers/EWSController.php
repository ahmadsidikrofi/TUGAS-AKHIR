<?php

namespace App\Http\Controllers;

use App\Models\HeartrateModel;
use App\Models\NibpModel;
use App\Models\NotificationsModel;
use App\Models\OxygenSaturationModel;
use App\Models\PasienModel;
use Illuminate\Http\Request;

class EWSController extends Controller
{
    function StoreEWS( Request $request )
    {
        $heart_beats = $request->input('hr');
        $blood_oxygen = $request->input('SpO2');
        $systolic = $request->input('nibp');
        $patient_id = $request->input('patient_id');
        // $patient = PasienModel::where('is_login', 1)->first();
        $patient = PasienModel::find($patient_id);
        if ($patient) {
            if ($patient->is_login === 1) {
                // Heartrate data
                $this->StoreHeartrate($patient, $heart_beats);
                // Oxygen Saturation data
                $this->StoreOxygenSaturation($patient, $blood_oxygen);
                // Nibp data
                $this->StoreNibp($patient, $systolic);
                $total_score = $patient->heartrate()->orderBy('created_at', 'desc')->first()->score + $patient->oxygenSaturation()->orderBy('created_at', 'desc')->first()->score + $patient->nibp()->orderBy('created_at', 'desc')->first()->score;
                NotificationsModel::create([
                    'patient_id' => $patient_id,
                    'total_score' => $total_score
                ]);
                return response()->json(['message' => 'Detak jantung berhasil disimpan'], 200);
            } else {
                return response()->json(['message' => 'Detak jantung gagal disimpan'], 500);
            }
        } else {
            return response()->json(['message' => 'Mungkin pasien belum login'], 500);
        }
    }

    public function StoreHeartrate( $patient, $heart_beats )
    {
        $heartrateCount = new HeartrateModel();
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;
        $patient->heartrate()->create(['heart_beats' => $heart_beats]);
        if ($heart_beats > 40 && $heart_beats <= 50) {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $yellowColor]); // Kuning
        } else if ( $heart_beats > 50 && $heart_beats <= 90  ) {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $greenColor ]); // hijau
        } else if ( $heart_beats > 90 && $heart_beats <= 110 ) {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $yellowColor]); // Kuning
        } else if ( $heart_beats > 110 && $heart_beats <= 130 ) {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $orangeColor ]); // orange
        } else {
            $patient->heartrate()->where('heart_beats', $heart_beats)->update(['score' => $redColor ]); // merah
        };

        if ($heartrateCount->count() > 100) {
            $heartrateCount->orderBy('created_at')->limit(50)->delete();
        }
    }

    public function StoreOxygenSaturation( $patient, $blood_oxygen )
    {
        $oxygenSaturationCount = new OxygenSaturationModel();
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;

        $patient->oxygenSaturation()->create(['blood_oxygen' => $blood_oxygen]);
        if ($blood_oxygen >= 92 && $blood_oxygen <= 93) {
            $patient->oxygenSaturation()->where('blood_oxygen', $blood_oxygen)->update(['score' => $orangeColor]);
        } else if ($blood_oxygen >= 94 && $blood_oxygen <= 95) {
            $patient->oxygenSaturation()->where('blood_oxygen', $blood_oxygen)->update(['score' => $yellowColor]);
        } else if ($blood_oxygen <= 91) {
            $patient->oxygenSaturation()->where('blood_oxygen', $blood_oxygen)->update(['score' => $redColor]);
        } else if ($blood_oxygen >= 96) {
            $patient->oxygenSaturation()->where('blood_oxygen', $blood_oxygen)->update(['score' => $greenColor]);
        }
        if ($oxygenSaturationCount->count() > 100) {
            $oxygenSaturationCount->orderBy('created_at')->limit(50)->delete();
        }
    }

    public function StoreNibp( $patient, $systolic )
    {
        $nibpCount = new NibpModel();
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;

        $patient->nibp()->create(['systolic' => $systolic]);
        if ($systolic <= 91 && $systolic <= 100) {
            $patient->nibp()->where('systolic', $systolic)->update(['score' => $orangeColor]);
        } else if ($systolic > 100 && $systolic <= 110) {
            $patient->nibp()->where('systolic', $systolic)->update(['score' => $yellowColor]);
        } else if ($systolic > 110 && $systolic <= 219) {
            $patient->nibp()->where('systolic', $systolic)->update(['score' => $greenColor]);
        } else {
            $patient->nibp()->where('systolic', $systolic)->update(['score' => $redColor]);
        }
        if ($nibpCount->count() > 100) {
            $nibpCount->orderBy('created_at')->limit(50)->delete();
        }
    }

    // WEB
    function HeartratePatientDetail($slug)
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $heartrate = HeartrateModel::where('patient_id', $pasienId)->get();
        return response()->json($heartrate, 200);
    }
    public function OxymeterPatientDetail($slug)
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $spo2 = OxygenSaturationModel::where('patient_id', $pasienId)->get();
        return response()->json($spo2, 200);
    }

    // MOBILE
    public function HeartratePatientMobileDetail(Request $request)
    {
        $pasien = $request->user();
        $heartrate = HeartrateModel::where('patient_id', $pasien->id)->get();
        if ( $pasien->is_login === 1 ) {
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'heartrate' => $heartrate
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login',
                'is_login' => $pasien->is_login,
            ], 401);
        }
        return response()->json($heartrate, 200);
    }

    // Notification Perawat
    public function EWSNotification()
    {
        $notifications = PasienModel::with(['notifications' => function($query) {
            $query->where('total_score', '>=', 5);
        }])->get();
        $dataPasien = $notifications->map(function($pasien) {
            $namaLengkap = $pasien->nama_lengkap;
            $totalScores = $pasien->notifications->pluck('total_score');
            $message = [];
            foreach($totalScores as $totalScore) {
                $message[] = [
                    'nama_lengkap' => $namaLengkap,
                    'total_score' => $totalScore,
                ];
            }
            return $message;
        });
        return response()->json($dataPasien, 200);
    }

    // Notification Pasien
    public function EWSNotificationMobile( Request $request )
    {
        $pasien = $request->user();
        if ($pasien !== null && $pasien->is_login === 1) {
            $notifications = NotificationsModel::where('patient_id', $pasien->id)
            ->where('total_score', '>=', 5)->get();
            return response()->json($notifications, 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pasien tidak login'
            ], 401);
        }
    }
}
