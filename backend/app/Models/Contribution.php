<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    protected $fillable = [
        'date',
        'supporter',
        'phone',
        'category',
        'purpose',
        'amount',
        'paid',
        'method',
        'reference',
        'received_by',
        'status',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
        'paid' => 'decimal:2',
    ];
}
