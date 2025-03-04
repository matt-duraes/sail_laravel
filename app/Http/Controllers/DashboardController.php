<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Obra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller 
{

    public function index()
    {
        $user = Auth::id();

        $animes = Obra::paginate(5)->where('user_id', $user)->sortByDesc('asc');
        $animeArray = $animes->toArray();
        
        return Inertia::render('Dashboard', [
            'obras' => $animeArray
        ]);
    }

}