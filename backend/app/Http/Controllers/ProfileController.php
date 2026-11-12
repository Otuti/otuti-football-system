<?php

namespace App\Http\Controllers;

use App\Models\ClubProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(): JsonResponse
    {
        $profile = ClubProfile::firstOrCreate([], [
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

        return response()->json($profile);
    }

    public function update(Request $request): JsonResponse
    {
        $profile = ClubProfile::firstOrCreate([]);

        $validated = $request->validate([
            'club_name' => 'nullable|string|max:255',
            'founded' => 'nullable|string|max:10',
            'location' => 'nullable|string|max:255',
            'home_ground' => 'nullable|string|max:255',
            'po_box' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:100',
            'phone' => 'nullable|string|max:50',
            'motto' => 'nullable|string|max:255',
            'colors' => 'nullable|string|max:100',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
        ]);

        $profile->update($validated);
        return response()->json($profile);
    }
}
