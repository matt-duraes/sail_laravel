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
                        ->paginate(10);
        $animeArray = $animes->toArray();
        return Inertia::render('Dashboard', [
            'obras' => $animeArray['data']
        ]);
    }

}