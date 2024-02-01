'use client'

import { useEffect } from "react";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
    useEffect(() => {
        // aqui podemos poner que envie una señal a algun api que este monitoriando la pagina
    }, [])
    return (
        <div>
            TIEMBLAAAA, HAY UN ERROR EN LA PAGINA 💁‍♂️
            <button onClick={reset} className="bg-white text-black">Intenta de nuevo, no prometo nada</button>
        </div>
    )
}

export default Error