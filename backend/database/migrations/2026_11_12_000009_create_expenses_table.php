<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('category');
            $table->string('description');
            $table->decimal('amount', 15, 2)->default(0);
            $table->string('paid_to')->nullable();
            $table->string('method')->nullable();
            $table->string('reference')->nullable();
            $table->string('approved_by')->nullable();
            $table->string('activity')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
