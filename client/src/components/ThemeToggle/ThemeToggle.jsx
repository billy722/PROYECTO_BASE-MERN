import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle(){
    const { theme, toggleTheme} = useTheme();

    return(
        <button onClick={toggleTheme}>
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}