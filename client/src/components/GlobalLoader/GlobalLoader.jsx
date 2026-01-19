import "./GlobalLoader.css";
import { useLoading } from "../../hooks/useLoading";

export default function GlobalLoader(){
    const { loading } = useLoading();

    if(!loading) return null;

    return(
        <div className="global-loader">
            <div className="spinner"></div>
        </div>
    );
}