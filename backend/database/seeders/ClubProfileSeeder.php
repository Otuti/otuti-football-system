<?php

namespace Database\Seeders;

use App\Models\ClubProfile;
use Illuminate\Database\Seeder;

class ClubProfileSeeder extends Seeder
{
    public function run(): void
    {
        ClubProfile::updateOrCreate(['id' => 1], [
            'club_name' => 'DAYSTAR UNITED FC',
            'founded' => '2015',
            'location' => 'Oluko Subcounty, Ayivu East Constituency, Arua / Ayivu / Oluko',
            'home_ground' => 'Alua Primary School Playground',
            'po_box' => '309 Arua City',
            'email' => 'daystarfc.champs@gmail.com',
            'phone' => '+256 700 000 000',
            'motto' => 'NEVER GIVE UP',
            'colors' => 'Red, Navy Blue, Black',
            'vision' => 'To be a leading community football club nurturing talent and creating opportunities.',
            'mission' => 'To develop talented players, empower the community and achieve excellence on and off the pitch.',
        ]);
    }
}
