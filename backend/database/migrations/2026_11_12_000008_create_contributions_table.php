<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contributions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('supporter');
            $table->string('phone')->nullable();
            $table->string('category')->nullable();
            $table->string('purpose');
            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('paid', 15, 2)->default(0);
            $table->string('method')->nullable();
            $table->string('reference')->nullable();
            $table->string('received_by')->nullable();
            $table->string('status')->default('Pledged');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contributions');
    }
};
