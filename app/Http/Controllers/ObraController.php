<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Obra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ObraController extends Controller 
{
    public function index(): Response
    {
        return Inertia::render('Obra/Adicionar', []);
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'site_origem' => 'required|url|max:255',
            'capitulo_parado' => 'required|string|min:1',
        ]);

        $validated['user_id'] = Auth::id();
        
        Obra::create($validated);
        
        return Inertia::render('Obra/Adicionar', [
            'success' => 'Obra adicionada com sucesso!'
        ]);
    }

    public function details($idObra): Response
    {
        $obra = Obra::findOrFail($idObra);
        return Inertia::render('Obra/Detalhes', [
            'obra' => $obra
        ]);
    }

    public function edit($idObra): Response
    {
        $obra = Obra::findOrFail($idObra);
        return Inertia::render('Obra/Editar', [
            'obra' => $obra
        ]);
    }

    public function destroy($idObra)
    {
        $obra = Obra::findOrFail($idObra);
        $obra->delete();

        return Redirect::route('dashboard')->with('success', 'Obra deletada com sucesso!');
    }
    public function update(Request $request, $idObra)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'site_origem' => 'required|url|max:255',
            'capitulo_parado' => 'required|string|min:1',
        ]);

        $obra = Obra::findOrFail($idObra);
        $obra->update($validated);

        return Redirect::route('obra.details', ['idObra' => $idObra])->with('success', 'Obra atualizada com sucesso!');
    }
}