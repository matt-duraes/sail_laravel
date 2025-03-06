import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

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
        patch(route('obra.update', { idObra: obra.id }));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Editar Obra" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold">Editar Obra</h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="nome">Nome</label>
                                    <input
                                        id="nome"
                                        type="text"
                                        value={data.nome}
                                        onChange={(e) => setData('nome', e.target.value)}
                                    />
                                    {errors.nome && <div>{errors.nome}</div>}
                                </div>
                                <div>
                                    <label htmlFor="site_origem">Site de Origem</label>
                                    <input
                                        id="site_origem"
                                        type="url"
                                        value={data.site_origem}
                                        onChange={(e) => setData('site_origem', e.target.value)}
                                    />
                                    {errors.site_origem && <div>{errors.site_origem}</div>}
                                </div>
                                <div>
                                    <label htmlFor="capitulo_parado">Capítulo Parado</label>
                                    <input
                                        id="capitulo_parado"
                                        type="text"
                                        value={data.capitulo_parado}
                                        onChange={(e) => setData('capitulo_parado', e.target.value)}
                                    />
                                    {errors.capitulo_parado && <div>{errors.capitulo_parado}</div>}
                                </div>
                                <button type="submit" disabled={processing}>Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}