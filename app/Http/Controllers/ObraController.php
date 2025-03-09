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

    /**
     * Pag
     *
     * @return Response
     */
    public function adicionarObraIndex(): Response
    {
        return Inertia::render('Obra/Adicionar', []);
    }

    public function adicionarObra(Request $request): Response
    {
        $dadosRequest = $this->validarObra($request);
        $dadosRequest['user_id'] = Auth::id();
        
        Obra::create($dadosRequest);
        
        return Inertia::render('Obra/Adicionar', [
            'success' => 'Obra adicionada com sucesso!'
        ]);
    }

    public function detalheObra($idObra): Response
    {
        $obra = Obra::findOrFail($idObra);
        
        return Inertia::render('Obra/Detalhes', [
            'obra' => $obra
        ]);
    }

    public function editarObraIndex($idObra): Response
    {
        $obra = Obra::findOrFail($idObra);
        
        return Inertia::render('Obra/Editar', [
            'obra' => $obra
        ]);
    }

    public function deletarObra($idObra)
    {
        $obra = Obra::findOrFail($idObra);
        $obra->delete();

        return Redirect::route('biblioteca')->with('success', 'Obra deletada com sucesso!');
    }

    public function editarObra(Request $request, $idObra)
    {
        $dadosRequest = $this->validarObra($request);

        $obra = Obra::findOrFail($idObra);
        $obra->update($dadosRequest);

        return Redirect::route('detalhe.obra', [
            'idObra' => $idObra
        ])->with('success', 'Obra atualizada com sucesso!');
    }

    private function validarObra($dadosRequest): array
    {
        return $dadosRequest->validate([
            'nome' => 'required|string|max:255',
            'site_origem' => 'required|url|max:255',
            'capitulo_parado' => 'required|string|min:1',
        ]);
    }

}