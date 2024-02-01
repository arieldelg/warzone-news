'use client'

interface Global { 
    error: Error,
    reset: () => void
}

const GLobalError = ({error, reset}: Global) => {
    return (
        <main>
            'ERROR 404 NOOOOO'
            <button onClick={reset}>Volver a intentar</button>
        </main>
    )
}

export default GLobalError