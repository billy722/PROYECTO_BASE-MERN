import { createContext, useState, useContext } from "react";
import { MODAL_TYPES } from "../constants/modalTypes";

const ModalContext = createContext();

export function ModalProvider({children}){
    const [modal, setModal] = useState({
        open: true,
        type: MODAL_TYPES.SUCCESS,
        title: "BIENVENIDO",
        message: "Has ingresado correctamente",
        onConfirm: true,
    });
    // const [modal, setModal] = useState({
    //     open: false,
    //     type: MODAL_TYPES.INFO,
    //     title: "",
    //     message: "",
    //     onConfirm: null,
    // });

    const show = ({type, title, message, onConfirm}) => {
        setModal({
            open:true,
            type,
            title,
            message,
            onConfirm: onConfirm || null,
        });
    };

    const close = () => {
        setModal( (prev) => ({ ...prev, open: false }) );
    };

    const confirm = () => {
        modal.onConfirm?.();
        close();
    };

    return (
        <ModalContext.Provider value={{modal, show, close, confirm}}>
            {children}
        </ModalContext.Provider>
    );

}

export function useModalContext(){
    const context = useContext(ModalContext);

    if(!context){
        throw new Error("useModalContext debe usarse solo dentro de ModalProvider");
    }
    return context;
}