import { useEffect, ReactNode, useState } from "react";
import AlertMessage from "./AlertMessage"; 
import { GoAlert } from "react-icons/go";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    body: ReactNode;
    title?: string;
    textActionOk: string;
    textActionCancel?: string;
    textConfirm: string;
    textBodyConfirm: string;
    validateForm: () => boolean
}

const ModalForm = ({ isOpen, onClose, onSubmit, body, title = "Formulario", textActionOk, textActionCancel = "Cancelar", textConfirm, textBodyConfirm, validateForm}: ModalProps) => {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        //Cierra el modal al presionar la tecla Escape.
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Modal principal */}
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md md:max-w-xl lg:max-w-2xl min-h-[40vh] max-h-[90vh] overflow-y-auto relative">
                    
                    <button onClick={onClose} className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer">
                        <IoClose size={30} />
                    </button>

                    <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>

                    <div className="mt-4 grid grid-cols-1 gap-3">{body}</div>

                    <div className="grid grid-cols-3 gap-3 mt-5">
                        <button 
                            onClick={onClose} 
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg col-span-1">
                            {textActionCancel}
                        </button>
                        <button 
                            onClick={() => {
                                if (!validateForm()) return;
                                setShowAlert(true);
                            }} 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg col-span-2">
                            {textActionOk}
                        </button>
                    </div>
                </div>
            </div>

            {/* Alerta de confirmación */}
            {showAlert && (
                <AlertMessage
                    title={textConfirm}
                    body={textBodyConfirm}
                    colorTitle="#F9B600"
                    onCancel={() => setShowAlert(false)}
                    onConfirm={() => {
                        setShowAlert(false);
                        onSubmit();
                    }}
                    icon={<GoAlert className="text-yellow-500 text-8xl mb-4" />}
                />
            )}
        </>
    );
};

export default ModalForm;
