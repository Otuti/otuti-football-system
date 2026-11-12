<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    protected $fillable = [
        'name',
        'contact',
        'phone',
        'email',
        'support_type',
        'pledged',
        'received',
        'start_date',
        'end_date',
        'status',
        'notes',
    ];

    protected $casts = [
        'pledged' => 'decimal:2',
        'received' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}
