import ButtonAddAnime from '@/Components/ButtonAddAnime';
import FormInput from '@/Components/FormInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import './obra.css'; // Importando o arquivo CSS

interface Obra {
    id: number;
    nome: string;
    site_origem: string;
    capitulo_parado: string;
}

export default function Editar() {
    const { props } = usePage<{ obra: Obra, auth: { user: User } }>();
    const { obra } = props;
    const { data, setData, patch, processing, errors } = useForm({
        nome: obra.nome,
        site_origem: obra.site_origem,
        capitulo_parado: obra.capitulo_parado,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        patch(route('obra.editar', { idObra: obra.id }));
    }

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="flex w-[100%] dark:bg-gray-800 justify-between items-center mx-auto max-w-7xl 
                    p-4
                ">
                    <div className="px-2 text-gray-900 dark:text-gray-100">
                        Editar Obra
                    </div>
                    <ButtonAddAnime  titulo="Voltar" caminho="biblioteca" />
                </div>

                <div className='page-container'>
                    <form onSubmit={handleSubmit} className='form-container'>
                        <FormInput
                            id="nome"
                            label="Nome da Obra"
                            name="nome"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            error={errors.nome}
                        />
                        <FormInput
                            id="site_origem"
                            label="Url do Primeiro Capítulo"
                            name="site_origem"
                            value={data.site_origem}
                            onChange={(e) => setData('site_origem', e.target.value)}
                            error={errors.site_origem}
                        />
                        <FormInput
                            id="capitulo_parado"
                            label="Capítulo Parado"
                            name="capitulo_parado"
                            value={data.capitulo_parado}
                            onChange={(e) => setData('capitulo_parado', e.target.value)}
                            error={errors.capitulo_parado}
                        />
                        <button className='button-submit texto-label' type="submit" disabled={processing}>Salvar</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}