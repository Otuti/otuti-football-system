<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('date');
            $table->string('category')->nullable();
            $table->string('venue')->nullable();
            $table->string('lead')->nullable();
            $table->decimal('budget', 15, 2)->default(0);
            $table->integer('attendance')->nullable();
            $table->string('status')->default('Planned');
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
