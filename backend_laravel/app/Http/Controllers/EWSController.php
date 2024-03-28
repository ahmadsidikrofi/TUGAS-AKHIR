<?php

namespace App\Http\Controllers;

use App\Models\HeartrateModel;
use App\Models\PasienModel;
use Illuminate\Http\Request;

class EWSController extends Controller
{
    function StoreHeartRate( Request $request )
    {
        $redColor = 3;
        $yellowColor = 1;
        $orangeColor = 2;
        $greenColor = 0;

        $heart_beats = $request->input('hr');
        $blood_oxygen = $request->input('SpO2');
        $patient_id = $request->input('patient_id');
        // $patient = PasienModel::where('is_login', 1)->first();
        $patient = PasienModel::find($patient_id);
        if ($patient) {
            if ($patient->is_login === 1) {
                // Heartrate data
                $patient->heartrate()->updateOrCreate(['heart_beats' => $heart_beats]);
                if ($heart_beats > 40 && $heart_beats <= 50) {
                    $patient->heartrate()->where('heart_beats', $heart_beats)->update(['colors' => $yellowColor]); // Kuning
                } else if ( $heart_beats > 50 && $heart_beats <= 90  ) {
                    $patient->heartrate()->where('heart_beats', $heart_beats)->update(['colors' => $greenColor ]); // hijau
                } else if ( $heart_beats > 90 && $heart_beats <= 110 ) {
                    $patient->heartrate()->where('heart_beats', $heart_beats)->update(['colors' => $yellowColor]); // Kuning
                } else if ( $heart_beats > 110 && $heart_beats <= 130 ) {
                    $patient->heartrate()->where('heart_beats', $heart_beats)->update(['colors' => $orangeColor ]); // orange
                } else {
                    $patient->heartrate()->where('heart_beats', $heart_beats)->update(['colors' => $redColor ]); // merah
                };

                // Oxygen Saturation
                $patient->oxygenSaturation()->updateOrCreate(['blood_oxygen' => $blood_oxygen]);
                return response()->json(['message' => 'Detak jantung berhasil disimpan'], 200);
            } else {
                return response()->json(['message' => 'Detak jantung gagal disimpan'], 500);
            }
        } else {
            return response()->json(['message' => 'Mungkin pasien belum login'], 500);
        }
    }
    public function Delete100Heartrate()
    {
        $deleteStart = 100;
        $maxRowHeartrate = HeartrateModel::Count();
        if ($maxRowHeartrate >= 500) {
            $patients = PasienModel::all();
            foreach ($patients as $patient) {
                $heartrates = $patient->heartrate()->orderBy('created_at', 'desc')->take($deleteStart)->get();
                foreach ($heartrates as $heartrate) {
                        $heartrate->delete();
                }
            }
            return response()->json(['message' => 'Detak jantung berhasil dihapus'], 200);
        } else {
            return response()->json(['message' => 'Baris detak jantung tidak mencapai 500, tidak ada yang dihapus'], 200);
        }
    }

    function HeartratePatientDetail($slug)
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $heartrate = HeartrateModel::where('patient_id', $pasienId)->orderBy('updated_at', 'desc')->get();
        return response()->json($heartrate, 200);
    }
    // function HeartRatePatient()
    // {
    //     $heartrate = HeartrateModel::latest()->get();
    //     return response()->json($heartrate, 200);
    // }
}
