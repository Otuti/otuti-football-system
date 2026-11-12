<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('opponent');
            $table->string('competition')->nullable();
            $table->string('venue')->nullable();
            $table->string('type')->nullable();
            $table->string('home_away')->default('Home');
            $table->integer('daystar_goals')->nullable();
            $table->integer('opponent_goals')->nullable();
            $table->string('status')->default('Scheduled');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
