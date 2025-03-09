import { Button } from "@headlessui/react";

interface ButtonProps {
    titulo: string;
    caminho: string;
}


export default function ButtonAddAnime({ titulo, caminho }: ButtonProps) {
    return (
        <a 
            href={route(`${caminho}`)} 
            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mr-2"}
        >
            {titulo}
        </a>
    );

}