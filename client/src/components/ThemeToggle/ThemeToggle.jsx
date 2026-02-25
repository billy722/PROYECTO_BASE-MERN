import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle(){
    const { theme, toggleTheme} = useTheme();

    return(
        <button className="btn" onClick={toggleTheme}>
            {theme === "dark" ? "🌙 Oscuro" : "☀️ Claro"}
        </button>
    );
}