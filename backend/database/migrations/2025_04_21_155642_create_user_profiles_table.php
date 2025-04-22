<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('salary')->nullable();
            $table->decimal('otherIncome')->nullable();
            $table->decimal('rent')->nullable();
            $table->decimal('utilities')->nullable();
            $table->decimal('transport')->nullable();
            $table->decimal('groceries')->nullable();
            $table->decimal('insurance')->nullable();
            $table->decimal('entertainment')->nullable();
            $table->decimal('subscriptions')->nullable();
            $table->string('savingsGoal')->nullable();
            $table->decimal('savingsTarget')->nullable();
            $table->boolean('setup_completed')->default(false);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
