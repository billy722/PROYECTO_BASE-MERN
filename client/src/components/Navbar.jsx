import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import "../styles/navbar.css"

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">

            <div className="navbar-section left">
                <strong>App Base </strong>
            </div>

            <div className="navbar-section center">
                <Link to="/home">Home</Link>
                <Link to="/ventas">Ventas</Link>
            </div>

            <div className="navbar-section right">
                {user && (
                    <>
                    <span>
                        {user.name} ({user.role})
                    </span>
                    <button onClick={logout}>Cerrar sesión</button>
                    </>
                )}
            </div>

        </nav>
    );
}

