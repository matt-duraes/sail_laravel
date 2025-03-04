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
    const { props } = usePage<{ obras: Obra[], auth: { user: User } }>();
    const { obras } = props;
    const nome = props.auth.user.name;

    const fontes = [
        { dominio: 'slimeread.com', regex: /cap-id\d+/ },
        { dominio: 'mangaonline.biz', regex: /capitulo-\d+/ },
        { dominio: 'seitacelestial.com', regex: /chapter-\d+/ }
    ];

    function montarUrlCapitulo(urlBase: string, capituloParado: string | number) {
        const capituloFormatado = capituloParado.toString().padStart(2, '0'); // Garantir que o capítulo tenha dois dígitos
        for (const fonte of fontes) {
            if (urlBase.includes(fonte.dominio)) {
                return urlBase.replace(fonte.regex, fonte.regex.source.split('-')[0] + '-' + capituloFormatado);
            }
        }
        return urlBase; // Retornar a URL original se não encontrar um domínio correspondente
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
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Lista de Obras</h2>
                        <ul className="mt-4 w-[100%]">
                            {Array.isArray(obras) && obras.length > 0 ? (
                                obras.map((obra) => (
                                    <li key={obra.id} className="mt-4 mb-4 w-[100%] flex flex-col bg-gray-700 p-4 gap-1 rounded-md">
                                        <div className="text-gray-900 dark:text-gray-100 flex">
                                            <strong className='mr-2'>Nome:</strong> {obra.nome}
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100 flex">
                                            <strong className='mr-2'>Site de Origem:</strong> {obra.site_origem}
                                        </div>
                                        <div className="text-gray-900 dark:text-gray-100 flex">
                                            <strong className='mr-2'>Capítulo Parado:</strong> {obra.capitulo_parado}
                                        </div>
                                        <a
                                            href={montarUrlCapitulo(obra.site_origem, obra.capitulo_parado) || '#'}
                                            target='_blank'
                                            className='p-4 mt-4 pt-2 pb-2 rounded bg-green-500 hover:bg-green-700 text-white font-bold w-40'
                                        >
                                            Continuar Leitura
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li className="mt-2 text-gray-900 dark:text-gray-100">
                                    Nenhuma obra encontrada.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}