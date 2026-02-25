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
                <img className="logo-app" src="../public/vite.svg" />
            </div>

            <div className="navbar-section center">
                <Link to="/home">Home</Link>
                <Link to="/pagina1">Pagina uno</Link>
                <Link to="/pagina1">Pagina dos</Link>
                {user.role == "admin" ? <Link to="/users">Usuarios</Link> : null }
            </div>

            <div className="navbar-section right">

                {user && (
                    <>
                        <div>
                            <div>
                                <ThemeToggle />
                                <button className="btn btn-warning" onClick={logout}>Cerrar sesión</button>
                            </div>
                            <div>
                                <span>
                                    <p>{user.name}: {user.role}</p>
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </nav>
    );
}

