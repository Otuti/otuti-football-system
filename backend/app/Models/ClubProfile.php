<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClubProfile extends Model
{
    protected $fillable = [
        'club_name',
        'founded',
        'location',
        'home_ground',
        'po_box',
        'email',
        'phone',
        'motto',
        'colors',
        'vision',
        'mission',
    ];
}
