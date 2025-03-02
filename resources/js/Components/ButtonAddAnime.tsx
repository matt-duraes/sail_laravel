import { Button } from "@headlessui/react";

interface ButtonProps {
    title: string;
}
export default function ButtonAddAnime({ title }: ButtonProps) {
    return (
        <Button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"}>
            {title}
        </Button>
    );

}