<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /*
        User::firstOrCreate(
            ['email' => 'achraf@gmail.com'],
            [
                'firstName' => 'Achraf',
                'lastName' => 'Halal',
                'dateOfBirth' => '2000-12-23',
                'password' => Hash::make('123456789'), 
                'role' => 'admin',
            ]
        );*/

        $this->call([
            TransactionSeeder::class,
        ]);
        
    }
}
