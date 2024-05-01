<?php

namespace App\Http\Controllers;

use App\Models\NotesModel;
use App\Models\PasienModel;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    public function GetNotesData( $slug )
    {
        $pasienId = PasienModel::where('slug', $slug)->value('id');
        $notes = NotesModel::where('patient_id', $pasienId)->latest()->get();
        return response()->json($notes, 200);
    }
    public function GetNotesMobile( Request $request )
    {
        $pasien = $request->user();
        if ($pasien !== null && $pasien->is_login === 1) {
            $notes = NotesModel::where('patient_id', $pasien->id)->latest()->get();
            return response()->json($notes, 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pasien tidak berada pada masa login'
            ], 401);
        }
    }
    public function StoreNote( Request $request )
    {
        $createNote = NotesModel::create([
            'patient_id' => $request->input('patient_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description')
        ]);
        if ($createNote) {
            return response()->json([
                'success' => true,
                'message' => 'Catatan berhasil dibuat',
                'note' => $createNote
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Catatan gagal dibuat',
            ], 500);
        }
    }

    public function DeleteNotes( $id )
    {
        $note = NotesModel::find($id);
        if (!$note) {
            return response()->json([
                'success' => false,
                'message' => 'Catatan gagal dihapus',
            ], 404);
        }

        $note->delete();
        return response()->json([
            'success' => true,
            'message' => 'Catatan berhasil dihapus',
        ], 200);
    }
}
