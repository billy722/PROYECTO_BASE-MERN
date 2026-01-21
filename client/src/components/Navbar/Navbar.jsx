import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import "./navbar.css"
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">

            <div className="navbar-section left">
                <strong>Logo App Base </strong>
            </div>

            <div className="navbar-section center">
                <Link to="/home">Home</Link>
                <Link to="/pagina1">Pagina uno</Link>
                <Link to="/pagina1">Pagina dos</Link>
            </div>

            <div className="navbar-section right">

                {user && (
                    <>
                    <span>
                        <p>{user.name} ({user.role})</p>
                    </span>
                    <ThemeToggle />
                    <button onClick={logout}>Cerrar sesión</button>
                    </>
                )}
            </div>

        </nav>
    );
}

