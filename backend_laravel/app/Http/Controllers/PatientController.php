<?php

namespace App\Http\Controllers;

use App\Models\PasienModel;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function SendPatientsToArduino()
    {
        $dataPatients = PasienModel::all();
        return response()->json($dataPatients, 200);
    }

    function PatientsData()
    {
        $patients = PasienModel::with('heartrate')->get();
        return response()->json($patients, 200);
    }

    public function PatientsDataDetail($slug)
    {
        $patient = PasienModel::where('slug', $slug)->first();
        return response()->json($patient, 200);
    }
    // function PatientsData()
    // {
    //     $patients = PasienModel::with(['heartrate' => function ($query) {
    //         $query->orderBy('heart_beats', 'desc');
    //     }])->get();
    //     return response()->json($patients, 200);
    // }
}
