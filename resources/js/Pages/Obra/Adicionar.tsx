import ButtonAddAnime from '@/Components/ButtonAddAnime';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import './obra.css'; // Importando o arquivo CSS
import { useState, useEffect } from 'react';
import FormInput from '@/Components/FormInput';
import ModalObra from '@/Components/ModalObra';

interface AdicionarProps extends PageProps<{ mustVerifyEmail: boolean; status?: string }> {
}

const Adicionar: React.FC<AdicionarProps> = () => {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        site_origem: '',
        capitulo_parado: '',
    });

    const { props } = usePage();
    const { success } = props;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (success) {
            setShowModal(true);
        }
    }, [success]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as 'nome' | 'site_origem' | 'capitulo_parado', event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('adicionar.store'), {
            preserveScroll: true,
            onSuccess: () => {
                // Resetar o formulário após o sucesso
                setData({
                    nome: '',
                    site_origem: '',
                    capitulo_parado: '',
                });
            }
        });
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="flex w-[100%] dark:bg-gray-800 justify-between items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Adicione suas obras favoritas e acompanhe o seu progresso!
                        </div>
                    </div>
                    <ButtonAddAnime titulo="Voltar" caminho="dashboard" />
                </div>

                <div className='page-container'>
                    <form onSubmit={handleSubmit} className='form-container'>
                        <FormInput
                            label="Nome do anime"
                            name="nome"
                            value={data.nome}
                            onChange={handleChange}
                            error={errors.nome}
                        />
                        <FormInput
                            label="Url do Primeiro Capítulo"
                            name="site_origem"
                            value={data.site_origem}
                            onChange={handleChange}
                            error={errors.site_origem}
                        />
                        <FormInput
                            label="Capítulo Parado"
                            name="capitulo_parado"
                            value={data.capitulo_parado}
                            onChange={handleChange}
                            error={errors.capitulo_parado}
                        />
                        <button className='button-submit texto-label' type="submit" disabled={processing}>Salvar</button>
                    </form>
                </div>

                {showModal && (
                    <ModalObra message={success as string} onClose={closeModal} />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Adicionar;