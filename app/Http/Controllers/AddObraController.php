<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;


class AddObraController extends Controller 
{
    public function index(): Response
    {

        return Inertia::render('Obra/Adicionar', [
        ]);
    }
    
}