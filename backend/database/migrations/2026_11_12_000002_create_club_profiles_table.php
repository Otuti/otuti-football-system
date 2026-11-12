<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('club_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('club_name')->default('DAYSTAR UNITED FC');
            $table->string('founded')->default('2015');
            $table->string('location')->nullable();
            $table->string('home_ground')->nullable();
            $table->string('po_box')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('motto')->nullable();
            $table->string('colors')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('club_profiles');
    }
};
