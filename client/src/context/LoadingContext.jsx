import { createContext, useEffect, useState } from "react";
import { uiEvents } from "./uiEvents";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    useEffect(() => {
        uiEvents.showLoader = showLoader;
        uiEvents.hideLoader = hideLoader;

        return () => {
            uiEvents.showLoader = null;
            uiEvents.hideLoader = null;
        };
        
    }, []);

    return(
        <LoadingContext.Provider value={{ loading, showLoader, hideLoader }}>
            {children}
        </LoadingContext.Provider>
    );
}