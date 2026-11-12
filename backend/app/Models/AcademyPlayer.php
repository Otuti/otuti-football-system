<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademyPlayer extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'academy_id',
        'age_category',
        'dob',
        'position',
        'jersey',
        'school',
        'guardian_name',
        'guardian_phone',
        'village',
        'academic_grade',
        'joined',
        'status',
        'notes'
    ];
}
