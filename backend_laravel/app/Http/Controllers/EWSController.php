<?php

namespace App\Http\Controllers;

use App\Models\PasienModel;
use Illuminate\Http\Request;

class EWSController extends Controller
{
    function StoreHeartRate( Request $request )
    {
        $redColor = '#ff0000';
        $yellowColor = '#f9ff00';
        $orangeColor = '#ffbe04';
        $greenColor = '#91d050';

        $heart_beats = $request->input('hr');
        $blood_oxygen = $request->input('SpO2');
        $patient_id = $request->input('patient_id');
        // $patient = PasienModel::where('is_login', 1)->first();
        $patient = PasienModel::find($patient_id);
        if ($patient) {
            if ($patient->is_login === 1) {
                // Heartrate data
                $patient->heartrate()->update(['heart_beats' => $heart_beats]);
                if ($heart_beats > 40 && $heart_beats <= 50) {
                    $patient->heartrate()->update(['colors' => $yellowColor]); // Kuning
                } else if ( $heart_beats > 50 && $heart_beats <= 90  ) {
                    $patient->heartrate()->update(['colors' => $greenColor ]); // hijau
                } else if ( $heart_beats > 90 && $heart_beats <= 110 ) {
                    $patient->heartrate()->update(['colors' => $yellowColor]); // Kuning
                } else if ( $heart_beats > 110 && $heart_beats <= 130 ) {
                    $patient->heartrate()->update(['colors' => $orangeColor ]); // orange
                } else {
                    $patient->heartrate()->update(['colors' => $redColor ]); // merah
                };

                // Oxygen Saturation
                $patient->oxygenSaturation()->update(['blood_oxygen' => $blood_oxygen]);
                return response()->json(['message' => 'Detak jantung berhasil disimpan'], 200);
            } else {
                return response()->json(['message' => 'Detak jantung gagal disimpan'], 500);
            }
        } else {
            return response()->json(['message' => 'Mungkin pasien belum login'], 500);
        }
    }
}
