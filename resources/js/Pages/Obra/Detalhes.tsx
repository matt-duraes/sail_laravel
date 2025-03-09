import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Obra {
    id: number;
    nome: string;
    site_origem: string;
    capitulo_parado: string;
}

export default function Detalhes() {
    const { props } = usePage<{ obra: Obra, success?: string, auth: { user: User } }>();
    const { obra, success } = props;
    const [link, setLink] = useState('');
    const [nomeFonte, setNomeFonte] = useState('');

    const fontes = [
        { dominio: 'slimeread.com', regex: /cap-\d+/, nome: 'slimeread' },
        { dominio: 'mangaonline.biz', regex: /capitulo-\d+/, nome: 'mangaonline' },
        { dominio: 'seitacelestial.com', regex: /chapter-\d+/, nome: 'seitacelestial' }
    ];

    useEffect(() => {
        for(const x of fontes){
            if(obra.site_origem.includes(x.dominio)){
                setNomeFonte(x.nome);
                break;
            }
        }
    }, [obra.site_origem]);


    function montarUrlCapitulo(urlBase: string, capituloParado: string | number) {

        for (const fonte of fontes) {
            if (urlBase.includes(fonte.dominio)) {
                if(fonte.nome != 'seitacelestial') {
                    return setLink(urlBase.replace(fonte.regex, fonte.regex.source.split('-')[0] + '-' + capituloParado.toString()));

                } 

                const capituloFormatado = capituloParado.toString().padStart(2, '0'); 
                setLink(urlBase.replace(fonte.regex, fonte.regex.source.split('-')[0] + '-' + capituloFormatado));
                return;
            }
        }
        setLink(urlBase)
    }
    
    function editarObra(idObra: number) {
        return route('obra.edit', { idObra });
    }

    function deletarObra(idObra: number) {
        router.delete(route('obra.destroy', { idObra }), {
            onSuccess: () => {
                console.log('Obra deletada com sucesso');
            },
            onError: (errors) => {
                console.error('Erro ao deletar obra:', errors);
            }
        });
    }


    return (
        <AuthenticatedLayout>
            <Head title="Detalhes da Obra" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="min-h-44  text-white flex flex-col gap-4 mt-4 mb-4 w-[100%] bg-gray-800 p-4 rounded-md cursor-pointer ">
                        {success && <div className="mb-4 text-green-500">{success}</div>}
                            <div className='flex justify-between'>
                                <a 
                                    href={obra.site_origem}
                                    target="_blank"
                                    className="text-blue-500 capitalize underline">
                                    Fonte: {nomeFonte}
                                </a>
                                <button
                                onClick={() => deletarObra(obra.id)}
                                className="pl-4 pr-4 text-white font-bold text-center rounded-md bg-red-500"
                                >
                                    Deletar Obra
                                </button>
                            </div>

                        <h1 className="text-2xl font-bold">
                            {obra.nome} 
                        </h1>
                        <p><strong>Capítulo Parado:</strong> {obra.capitulo_parado}</p>
                        <div className='flex gap-4'>
                            <a
                                href={editarObra(obra.id) || '#'}
                                className="mt-2 border-solid border border-blue-400 text-blue-400 font-bold p-2 w-48 text-center rounded-md"
                            >
                                Editar
                            </a>
                            <a onClick={() => montarUrlCapitulo(obra.site_origem, obra.capitulo_parado)} 
                                href= {link}
                                target='_blank'
                                className="mt-2 bg-green-700 text-white font-bold p-2 w-48 text-center rounded-md"
                            >
                                Continuar Leitura
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}