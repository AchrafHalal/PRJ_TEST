<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TransactionFactory extends Factory
{
    public function definition(): array
    {
        $type = $this->faker->randomElement(['income', 'expense']);
        
        return [
            'user_id' => 4,
            'amount' => $this->faker->randomFloat(2, 10, 2000),
            'category' => $this->faker->randomElement([
                'Rent', 'Utilities', 'Groceries', 'Entertainement', 'Food & Health',
                'Transport', 'Subscriptions'
            ]),
            'type' => $type,
            'date' => $this->faker->dateTimeBetween('01-01-' . now()->year, '31-05-' . now()->year),
            'description' => $this->faker->sentence(6),
            
        ];
    }
}
