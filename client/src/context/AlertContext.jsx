import { createContext, useEffect, useState } from "react";
export const AlertContext = createContext();
import { uiEvents } from "./UiEvents";

export function AlertProvider({ children }){
    const [ alert, setAlert] = useState();

    useEffect(() => {
        uiEvents.showAlert = showAlert;

        return () => {
            uiEvents.showAlert = null;
        }
    }, []);

    const showAlert = (message, type = "info") => {
        setAlert({message, type});

        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {children}
        </AlertContext.Provider>
    );

}