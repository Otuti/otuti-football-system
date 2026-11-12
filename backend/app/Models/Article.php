<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'author',
        'location',
        'published_date',
        'is_hero',
        'image_url',
        'excerpt',
        'content',
        'status',
        'created_by'
    ];

    protected $casts = [
        'is_hero' => 'boolean',
    ];
}
