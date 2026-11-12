<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'full_name',
        'username',
        'email',
        'password',
        'role',
        'department',
        'phone',
        'active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'active' => 'boolean',
        ];
    }

    public function isAdmin(): bool
    {
        return in_array($this->role, ['Admin', 'Super Administrator', 'Club CEO']);
    }

    public function isTreasurer(): bool
    {
        return $this->role === 'Treasurer' || $this->isAdmin();
    }

    public function isCoach(): bool
    {
        return in_array($this->role, ['Team Manager', 'Head Coach']) || $this->isAdmin();
    }

    public function isSecretary(): bool
    {
        return $this->role === 'Secretary' || $this->isAdmin();
    }
}
