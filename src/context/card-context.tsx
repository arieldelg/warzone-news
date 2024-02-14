'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

type React = {
    children: React.ReactNode
}

type wallet = {
    getOptimistic: object[],
    setGetOptimistic: React.Dispatch<React.SetStateAction<object[]>>,
    setSend: React.Dispatch<React.SetStateAction<boolean>>,
    send: boolean
}

const CardContext = createContext<wallet | null>(null)

const CardContextProvider = ({ children }: React) => {
    let list: object[] = []
    const [getOptimistic, setGetOptimistic] = useState(list)
    const [send, setSend] = useState(false)

    return (
        <CardContext.Provider value={{
            getOptimistic,
            setGetOptimistic,
            setSend,
            send
          }}>
            { children }
        </CardContext.Provider>
    )
}

const useCardContext = () => {
    const context = useContext(CardContext)
    if (!context) {
        throw new Error(
            'useCardContext mus be used within a Provider'
        )
    }
    return context
}

export { CardContextProvider, CardContext, useCardContext }