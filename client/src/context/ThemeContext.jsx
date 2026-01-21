import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({children}){
    const THEMES = ["light", "dark"];

    const [ theme, setTheme ] = useState( () => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(()=>{
        const root = window.document.documentElement;
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

    }, [theme]);

   const toggleTheme = () => {
        setTheme(prev => {
            const index =THEMES.indexOf(prev);
            const nextIndex = (index + 1) % THEMES.length;
            return THEMES[nextIndex];
        });
   }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );

}