import { useModalContext } from "../../context/ModalContext";
import { MODAL_TYPES } from "../../constants/modalTypes";
import "./Modal.css";

export default function Modal(){
    const {modal, confirm, close} = useModalContext();

    if(!modal.open) return null;

    const isConfirm = modal.type === MODAL_TYPES.WARNING || modal.type === MODAL_TYPES.DANGER;


    return (
        <div className="modal-backdrop">
            <div className={`modal ${modal.type}`}>
                <h3>{modal.title}</h3>
                <p>{modal.message}</p>

                <div className="actions">
                   
                    <button className={`btn btn-close ${modal.type}`} onClick={close}>Cerrar</button>

                    {isConfirm && <button className="confirm" onClick={confirm}>Confirmar</button>}

                </div>
                
            </div>
        </div>
    );
}