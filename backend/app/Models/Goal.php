<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'target_amount',
        'monthly_saving',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
