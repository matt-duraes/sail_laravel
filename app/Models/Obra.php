<?php
// filepath: /home/matt/Documentos/dev/2025-03-01-laravel_inertia/app/Models/Obra.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obra extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nome',
        'site_origem',
        'capitulo_parado',
    ];

    /**
     * Get the user that owns the obra.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}