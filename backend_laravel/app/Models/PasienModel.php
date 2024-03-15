<?php

namespace App\Models;

// use Laravel\Sanctum\HasApiTokens;
// use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PasienModel extends Model
{
    use HasFactory;
    use Sluggable;
    protected $table = "users";
    protected $guarded = [];

    public function heartrate()
    {
        return $this->hasOne(HeartrateModel::class, 'patient_id');
    }
    public function oxygenSaturation()
    {
        return $this->hasOne(OxygenSaturationModel::class, "patient_id");
    }
    public function respirationrate()
    {
        return $this->hasOne(RespirationrateModel::class, "patient_id");
    }
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'nama_lengkap'
            ]
        ];
    }
}
