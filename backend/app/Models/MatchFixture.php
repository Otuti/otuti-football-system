<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchFixture extends Model
{
    protected $table = 'matches';

    protected $fillable = [
        'date',
        'opponent',
        'competition',
        'venue',
        'type',
        'home_away',
        'daystar_goals',
        'opponent_goals',
        'status',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
        'daystar_goals' => 'integer',
        'opponent_goals' => 'integer',
    ];
}
