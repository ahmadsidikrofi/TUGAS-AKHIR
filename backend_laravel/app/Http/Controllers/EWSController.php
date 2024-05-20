<?php

namespace App\Http\Controllers;

use App\Jobs\StoreDataEwsJob;
use App\Models\HeartrateModel;
use App\Models\NibpModel;
use App\Models\NotificationsModel;
use App\Models\OxygenSaturationModel;
use App\Models\PasienModel;
use App\Models\TemperatureModel;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EWSController extends Controller
{
    function StoreEWS( Request $request )
    {
        $heart_beats = $request->input('hr');
        $blood_oxygen = $request->input('SpO2');
        $systolic = $request->input('nibp');
        $temp = $request->input('temp');
        $patient_id = $request->input('patient_id');

        // Queue::push(new StoreDataEwsJob($dataToStore));
        $patient = PasienModel::find($patient_id);
        if ($patient) {
            if ($patient->is_login == '1' && $patient->is_active == 'active') {
                // Heartrate data
                $this->StoreHeartrate($patient, $heart_beats);
                // Oxygen Saturation data
                $this->StoreOxygenSaturation($patient, $blood_oxygen);
                // Nibp data
                $this->StoreNibp($patient, $systolic);
                // Temperature Data
                $this->StoreTemp($patient, $temp);

                $heartrateScore = $patient->heartrate()->orderBy('created_at', 'desc')->first()->score;
                $oxygenScore = $patient->oxygenSaturation()->orderBy('created_at', 'desc')->first()->score;
                $nibpScore = $patient->nibp()->orderBy('created_at', 'desc')->first()->score;
                $tempScore = $patient->temperature()->orderBy('created_at', 'desc')->first()->score;
                $total_score = $heartrateScore + $oxygenScore + $nibpScore + $tempScore;
                NotificationsModel::create([
                    'patient_id' => $patient_id,
                    'total_score' => $total_score
                ]);
                return response()->json(['message' => 'Data berhasil disimpan'], 200);
            } else {
                return response()->json(['message' => 'Pasien tidak berada pada masa login atau sedang tidak aktif, Data gagal disimpan'], 401);
            }
        } else {
            return response()->json(['message' => 'Pasien tidak terdaftar pada database rumah sakit'], 401);
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

    public function StoreTemp( $patient, $temp )
    {
        $tempCount = new TemperatureModel();
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;

        $patient->temperature()->create(['patient_temp' => $temp]);
        if ($temp <= 35) {
            $patient->temperature()->where('patient_temp', $temp)->update(['score' => $redColor]);
        } else if ($temp >= 35.1 && $temp <= 36.0) {
            $patient->temperature()->where('patient_temp', $temp)->update(['score' => $yellowColor]);
        } else if ($temp >= 36.1 && $temp <= 38.0) {
            $patient->temperature()->where('patient_temp', $temp)->update(['score' => $greenColor]);
        } else if ($temp >= 38.1 && $temp <= 39.0) {
            $patient->temperature()->where('patient_temp', $temp)->update(['score' => $yellowColor]);
        } else if ($temp >= 39.1) {
            $patient->temperature()->where('patient_temp', $temp)->update(['score' => $orangeColor]);
        }
        if ($tempCount->count() > 100) {
            $tempCount->orderBy('created_at')->limit(50)->delete();
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
    public function NibpPatientDetail($slug)
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $nibp = NibpModel::where('patient_id', $pasienId)->get();
        return response()->json($nibp, 200);
    }
    public function TempPatientDetail($slug)
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $temp = TemperatureModel::where('patient_id', $pasienId)->get();
        return response()->json($temp, 200);
    }

    // MOBILE
    public function HeartratePatientMobileDetail(Request $request)
    {
        $pasien = $request->user();
        if ( $pasien ) {
            $heartrate = HeartrateModel::where('patient_id', $pasien->id)->orderBy('created_at', 'desc')
                ->take(20)
                ->get()
                ->toArray();
            $heartrate = array_reverse($heartrate);
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'heartrate' => $heartrate
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login',
            ], 401);
        }
    }

    public function OxymeterPatientMobileDetail( Request $request )
    {
        $pasien = $request->user();
        if ($pasien) {
            $spo2 = OxygenSaturationModel::where('patient_id', $pasien->id)->orderBy('created_at', 'desc')
                ->take(20)
                ->get()
                ->toArray();
            $spo2 = array_reverse($spo2);
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'oxygen' => $spo2,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login',
            ], 401);
        }
    }

    public function SystolicPatientMobileDetail( Request $request )
    {
        $pasien = $request->user();
        if ($pasien) {
            $nibp = NibpModel::where('patient_id', $pasien->id)->orderBy('created_at', 'desc')
                ->take(20)
                ->get()
                ->toArray();
            $nibp = array_reverse($nibp);
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'blood_presure' => $nibp,
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login',
            ], 401);
        }
    }

    public function TempPatientMobileDetail( Request $request )
    {
        $pasien = $request->user();
        if ($pasien) {
            $temp = TemperatureModel::where('patient_id', $pasien->id)->orderBy('created_at', 'desc')
                ->take(20)
                ->get()
                ->toArray();
            $temp = array_reverse($temp);
            return response()->json([
                'success' => true,
                'message' => 'Kamu sedang masa login',
                'patient_temp' => $temp
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Kamu tidak berada pada masa login'
            ], 401);
        }
    }

    // Notification Perawat
    public function EWSNotification()
    {
        $notifications = PasienModel::with(['notifications'])->latest()->get();
        $dataPasien = $notifications->map(function($pasien) {
            $namaLengkap = $pasien->nama_lengkap;
            $message = [];

            foreach ($pasien->notifications as $notification) {
                $message[] = [
                    'nama_lengkap' => $namaLengkap,
                    'total_score' => $notification->total_score,
                    'created_at' => Carbon::parse($notification->created_at)->diffForHumans(),
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
        if ($pasien !== null ) {
            $notifications = NotificationsModel::where('patient_id', $pasien->id)
            ->where('total_score', '>=', 5)->get();
            return response()->json($notifications, 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pasien tidak berada pada masa login'
            ], 401);
        }
    }
}
