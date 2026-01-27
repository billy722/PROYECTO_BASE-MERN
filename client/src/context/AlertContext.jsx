import { createContext, useEffect, useState } from "react";
import { ALERT_TYPES } from "../constants/alertTypes";
import { uiEvents } from "./UiEvents";

export const AlertContext = createContext();
const ALERT_TIMEOUT = 1500;

export function AlertProvider({ children }){
    const [ alert, setAlert] = useState();

    const showAlert = (message, type = ALERT_TYPES.INFO) => {

        // Validación del tipo
        const validTypes = Object.values(ALERT_TYPES);

        if (!validTypes.includes(type)) {
            console.warn(
                `[AlertContext] Tipo de alert inválido: "${type}". Usando INFO por defecto.`
            );
            type = ALERT_TYPES.INFO;
        }

        setAlert({message, type});

        setTimeout(() => {
            setAlert(null);
        }, ALERT_TIMEOUT);
    }

    useEffect(() => {
        uiEvents.showAlert = showAlert;

        return () => {
            uiEvents.showAlert = null;
        }
    }, []);

    

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {children}
        </AlertContext.Provider>
    );

}