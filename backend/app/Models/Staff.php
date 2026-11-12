<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table = 'staff';

    protected $fillable = [
        'full_name',
        'role',
        'department',
        'phone',
        'email',
        'start_date',
        'status',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
    ];
}
