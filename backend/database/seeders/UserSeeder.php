<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'full_name' => 'Otuti Ronald',
                'username' => 'admin',
                'email' => 'daystarfc.champs@gmail.com',
                'role' => 'Admin',
                'department' => 'Executive Management',
                'password' => Hash::make('password'),
                'active' => true,
            ],
            [
                'full_name' => 'Demo Secretary',
                'username' => 'secretary',
                'email' => 'secretary@daystar.test',
                'role' => 'Secretary',
                'department' => 'Administration',
                'password' => Hash::make('DemoSecretary!2026#'),
                'active' => true,
            ],
            [
                'full_name' => 'Demo Treasurer',
                'username' => 'treasurer',
                'email' => 'treasurer@daystar.test',
                'role' => 'Treasurer',
                'department' => 'Finance',
                'password' => Hash::make('DemoTreasurer!2026#'),
                'active' => true,
            ],
            [
                'full_name' => 'Demo Team Manager',
                'username' => 'manager',
                'email' => 'manager@daystar.test',
                'role' => 'Team Manager',
                'department' => 'Technical & Coaching',
                'password' => Hash::make('DemoManager!2026#'),
                'active' => true,
            ],
            [
                'full_name' => 'Demo Viewer',
                'username' => 'viewer',
                'email' => 'viewer@daystar.test',
                'role' => 'Viewer',
                'department' => 'Community Member',
                'password' => Hash::make('DemoViewer!2026#'),
                'active' => true,
            ],
        ];

        foreach ($users as $u) {
            User::updateOrCreate(['username' => $u['username']], $u);
        }
    }
}
