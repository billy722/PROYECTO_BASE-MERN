import { createContext, useState } from "react";
export const AlertContext = createContext();

export function AlertProvider({ children }){
    const [ alert, setAlert] = useState();

    const showAlert = (message, type = "info") => {
        setAlert({message, type});

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {children}
        </AlertContext.Provider>
    );

}