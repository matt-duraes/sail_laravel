import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import './global.css'; // Importando o arquivo CSS

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {

    return (
        <>
            <Head title="Welcome" />
            <main className="h-[100vh] bg-blue-500 flex flex-col items-center justify-center text-white font-bold gap-4"> 
                <h1>EM CONSTRUÇÃO</h1>
                <nav className="flex w-[300px] gap-4 justify-end">
                    {auth.user ? (
                        <Link
                            href={route('biblioteca')}
                            className="link-home"
                        >
                            Biblioteca
                        </Link>
                    ) : (
                        <>

                            <Link
                                href={route('register')}
                                className="link-home"
                            >
                                Registrar
                            </Link>
                            <Link
                                href={route('login')}
                                className="link-home"
                            >
                                Fazer login
                            </Link>
                        </>
                    )}
                </nav>
            </main>
        </>
    );
}
