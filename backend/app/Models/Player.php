<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = [
        'full_name',
        'player_id',
        'jersey',
        'position',
        'team',
        'dob',
        'phone',
        'joined',
        'status',
        'notes',
    ];

    protected $casts = [
        'jersey' => 'integer',
        'dob' => 'date',
        'joined' => 'date',
    ];
}
