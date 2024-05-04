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
        if ($pasien !== null ) {
            $notes = NotesModel::where('patient_id', $pasien->id)->latest()->get();
            return response()->json($notes, 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Pasien tidak berada pada masa login'
            ], 401);
        }
    }

    public function StoreNote( Request $request, $slug )
    {
        $pasien = PasienModel::where('slug', $slug)->first();
        if ($pasien) {
            $createNote = NotesModel::create([
                'patient_id' => $pasien->id,
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
    }

    public function UpdateNote( Request $request, $id )
    {
        $note = NotesModel::find($id);
        $note->update($request->all());
        if ($note->wasChanged()) {
            return response()->json([
                'success' => true,
                'message' => 'Catatan berhasil diubah',
                'note' => $note
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada catatan yang diubah',
            ], 200);
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
