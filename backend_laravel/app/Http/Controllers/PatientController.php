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
        return response()->json($patients);
    }
}
