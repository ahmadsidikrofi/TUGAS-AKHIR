<?php

namespace App\Http\Controllers;

use App\Models\PasienModel;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function PatientsAll()
    {
        // $dataPatients = PasienModel::with('heartrate', 'respirationrate')->latest()->get();
        $dataPatients = PasienModel::all();
        return response()->json($dataPatients, 200);
    }
}
