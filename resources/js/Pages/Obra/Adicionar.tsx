import ButtonAddAnime from '@/Components/ButtonAddAnime';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';


export default function Adicionar({
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="flex w-[100%] dark:bg-gray-800 justify-between items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Adicione suas obras favoritas e acompanhe o seu progresso!
                        </div>
                    </div>
                    <ButtonAddAnime titulo="Voltar" caminho="dashboard"/>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
