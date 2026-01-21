import { useModalContext } from "../context/ModalContext";

export function useModal() {
    const { show, close } = useModalContext();

    return {
        show, close
    };
}