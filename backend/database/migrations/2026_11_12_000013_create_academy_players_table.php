<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('academy_players', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('academy_id')->nullable();
            $table->string('age_category'); // U-12, U-15, U-17, U-20
            $table->date('dob')->nullable();
            $table->string('position')->nullable()->default('Forward');
            $table->integer('jersey')->nullable();
            $table->string('school')->nullable();
            $table->string('guardian_name')->nullable();
            $table->string('guardian_phone')->nullable();
            $table->string('village')->nullable();
            $table->string('academic_grade')->nullable()->default('Very Good');
            $table->date('joined')->nullable();
            $table->string('status')->default('Active Scholar');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academy_players');
    }
};
