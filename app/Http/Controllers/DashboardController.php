<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Obra;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

class DashboardController extends Controller 
{
    

    public function index()
    {
        $user = Auth::id();

        $animes = Obra::where('user_id', $user)
                        ->orderBy('created_at', 'desc')
                        ->paginate(5);
        $animeArray = $animes->toArray();

        return Inertia::render('Dashboard', [
            'obras' => $animeArray['data'],
            'paginacao' => [
                'pagina_atual' => $animeArray['current_page'],
                'total_paginas' => $animeArray['last_page'],
                'por_pagina' => $animeArray['per_page'],
                'total' => $animeArray['total'],
            ]
        ]);
    }

}