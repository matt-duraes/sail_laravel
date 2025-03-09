<?php

use App\Http\Controllers\BibliotecaController;
use App\Http\Controllers\ObraController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/biblioteca', [BibliotecaController::class, 'index'])->name('biblioteca');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function() {
    Route::get('/adicionar-obra-index', [ObraController::class, 'adicionarObraIndex'])->name('adicionar.obra.index');
    Route::post('/adicionar-obra', [ObraController::class, 'adicionarObra'])->name('adicionar.obra');
    Route::get('/detalhe-obra/{idObra}', [ObraController::class, 'detalheObra'])->name('detalhe.obra');
    Route::get('/editar-obra-index/{idObra}', [ObraController::class, 'editarObraIndex'])->name('editar.obra.index');
    Route::patch('/editar-obra/{idObra}', [ObraController::class, 'editarObra'])->name('obra.editar');
    Route::delete('/deletar-obra/{idObra}', [ObraController::class, 'deletarObra'])->name('obra.deletar');
});

require __DIR__.'/auth.php';