import React, { useContext, useState, useEffect, createContext} from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)


export const GlobalProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(true)
const [isLoading, setIsLoading] = useState(true)
const [userCountry, setUserCountry] = useState(null)

useEffect(() => {
    setTimeout(() => {
        setIsLoading(false)
    }, 300);
}, [])


    return (
        <GlobalContext.Provider
            value={{
            user,
            setUser,
            isLoading,
            setIsLoading,
            isLoggedIn,
            setIsLoggedIn,
            userCountry, 
            setUserCountry
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
}