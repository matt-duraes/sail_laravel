import ButtonAddAnime from '@/Components/ButtonAddAnime';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface Obra {
    id: number;
    nome: string;
    site_origem: string;
    capitulo_parado: string;
}

export default function Dashboard() {
    const {props} = usePage<{obras: Obra[], auth: { user: User }}>();
    const {obras = []} = props;

    console.log(obras)
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="flex w-[100%] dark:bg-gray-800 justify-between items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Você está logado, Bem-vindo!
                        </div>
                    </div>
                    <ButtonAddAnime titulo="Adicionar Anime" caminho='adicionar.index'/>
                </div>
                <div className="mt-4 bg-white dark:bg-gray-800 overflow-hidden w-[100%] max-w-7xl mx-auto">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Lista de Obras</h2>
                        <ul className="mt-4 w-[100%]">
                            {obras ? (
                                obras.map((obra) => (
                                <li key={obra.id} className="mt-4 mb-4 w-[100%] flex flex-col bg-gray-700 p-4 gap-1 rounded-md">
                                    <div className="text-gray-900 dark:text-gray-100 flex">
                                        <strong>Nome:</strong> {obra.nome}
                                    </div>
                                    <div className="text-gray-900 dark:text-gray-100 flex">
                                        <strong>Site de Origem:</strong> {obra.site_origem}
                                    </div>
                                    <div className="text-gray-900 dark:text-gray-100 flex">
                                        <strong>Capítulo Parado:</strong> {obra.capitulo_parado}
                                    </div>
                                </li>
                            ))
                        ): (
                            <li className="mt-2 text-gray-900 dark:text-gray-100">
                                Nenhuma foi cadastrada.
                            </li>
                            )
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
