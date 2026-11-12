<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'full_name',
        'member_no',
        'category',
        'phone',
        'email',
        'area',
        'joined',
        'status',
        'notes',
    ];

    protected $casts = [
        'joined' => 'date',
    ];
}
