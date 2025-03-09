import ButtonAddAnime from '@/Components/ButtonAddAnime';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';

interface Obra {
    id: number;
    nome: string;
    site_origem: string;
    capitulo_parado: string;
}
interface Paginacao {
    pagina_atual : number|string;
    total_paginas : number|string;
    por_pagina : number|string;
    total : number|string;
}

export default function Dashboard() {
    const { props } = usePage<{ obras: Obra[], paginacao: Paginacao, auth: { user: User } }>();
    const { obras, paginacao } = props;
    const nome = props.auth.user.name;


    function acessarObra(idObra: number) {
        router.get(route('obra.details', { idObra }));
    }

    function alterarPagina(page: number) {
        router.get(route('dashboard', { page }));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Biblioteca" />
            <div className="py-12">
                <div className="flex w-[100%] dark:bg-gray-800 justify-between items-center mx-auto max-w-7xl">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Bem-vindo, {nome}!
                        </div>
                    </div>
                    <ButtonAddAnime titulo="Adicionar Anime" caminho='adicionar.index' />
                </div>
                <div className="mt-4 bg-white dark:bg-gray-800 overflow-hidden w-[100%] max-w-7xl mx-auto">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Minhas Obras</h2>
                        <ul className="mt-4 w-[100%]">
                            {Array.isArray(obras) && obras.length > 0 ? (
                                obras.map((obra) => (
                                    <li 
                                        key={obra.id} 
                                        className="mt-4 mb-4 w-[100%] flex flex-col bg-gray-700 p-4 gap-1 rounded-md cursor-pointer hover:bg-gray-600"
                                        onClick={() => acessarObra(obra.id)}
                                    >
                                        <div className="text-gray-900 dark:text-gray-100 flex">
                                            <strong className='mr-2'>Nome:</strong> {obra.nome}
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100 flex">
                                            <strong className='mr-2'>Capítulo Parado:</strong> {obra.capitulo_parado}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="mt-2 text-gray-900 dark:text-gray-100">
                                    Nenhuma obra encontrada.
                                </li>
                            )}
                        </ul>
                        {Number(paginacao.total_paginas) > 1 && (
                            <div className="mt-4">
                                <nav className="pagination">
                                    <ul className="flex justify-center">
                                        {Array.from({ length: Number(paginacao.total_paginas) }, (_, index) => (
                                            <li key={index} className={`mx-1 ${paginacao.pagina_atual === index + 1 ? 'font-bold' : ''}`}>
                                                <button
                                                    onClick={() => alterarPagina(index + 1)}
                                                    className={`px-4 py-2 border rounded ${paginacao.pagina_atual === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>       
                        )}
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}