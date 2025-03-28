<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected function casts():array{
        return[
            'is_completed' => 'boolean',
            'due_date' => 'date'
        ];
    }
}
