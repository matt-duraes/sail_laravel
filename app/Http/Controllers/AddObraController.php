<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Obra;
use Illuminate\Http\Request;
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

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'site_origem' => 'required|url|max:255',
            'capitulo_parado' => 'required|string|min:1',
        ]);
        // Adicionar o id do usuário autenticado
        $validated['user_id'] = Auth::id();
        
        // Processamento dos dados (exemplo: salvar no banco de dados)
        Obra::create($validated);
        
        return Inertia::render('Obra/Adicionar', [
            'success' => 'Obra adicionada com sucesso!'
        ]);


    }
}