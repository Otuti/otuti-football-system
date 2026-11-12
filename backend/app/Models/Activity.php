<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'title',
        'date',
        'category',
        'venue',
        'lead',
        'budget',
        'attendance',
        'status',
        'details',
    ];

    protected $casts = [
        'date' => 'date',
        'budget' => 'decimal:2',
        'attendance' => 'integer',
    ];
}
