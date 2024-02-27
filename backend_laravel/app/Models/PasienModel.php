<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

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
