import "./Alert.css";
import { useAlert } from "../../hooks/useAlert";

export default function Alert(){
    const { alert } = useAlert();

    if(!alert) return null;

    return (
        <div className="alert-container">
            <div className={`alert ${alert.type}`}>
                {alert.message}
            </div>
        </div>
    );
}