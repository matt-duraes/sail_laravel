<?php

use App\Http\Controllers\DashboardController;
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
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function() {
    Route::get('/adicionar-novo', [ObraController::class, 'index'])->name('adicionar.index');
    Route::post('/adicionar-novo', [ObraController::class, 'store'])->name('adicionar.store');
    Route::get('/obra/{idObra}', [ObraController::class, 'details'])->name('obra.details');
    Route::get('/obra/{idObra}/editar', [ObraController::class, 'edit'])->name('obra.edit');
    Route::delete('/obra/{idObra}', [ObraController::class, 'destroy'])->name('obra.destroy');
    Route::patch('/obra/{idObra}', [ObraController::class, 'update'])->name('obra.update');
});

require __DIR__.'/auth.php';