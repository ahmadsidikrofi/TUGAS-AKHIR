<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RespirationrateModel extends Model
{
    use HasFactory;
    protected $table = 'respiration_rate';
    protected $guarded = [];

    public function patient()
    {
        return $this->belongsTo(PasienModel::class, "patient_id");
    }
}
