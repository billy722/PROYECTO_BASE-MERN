import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/utilities/layout.css";

export default function MainLayout(){
    return (
        <>
            <Navbar/>
            <main className="main-container">
                <Outlet />
            </main>
        </>
    );
}