import { useEffect, ReactNode, useState } from "react";
import AlertMessage from "./AlertMessage"; 
import { GoAlert } from "react-icons/go";

interface ModalProps {
    isOpen: boolean; // Indica si el modal está abierto o cerrado.
    onClose: () => void; // Función para cerrar el modal.
    onSubmit: () => void; // Función que se ejecuta al enviar el formulario.
    body: ReactNode; // Contenido personalizado dentro del formulario.
    title?: string; // Título opcional para el modal.
    textActionOk: string; // Título opcional para el modal
    textActionCancel?: string; // Título opcional para el modal
    textConfirm: string; // Título para la confirmacion de modal
    textBodyConfirm: string; // Contenido para la confirmacion de modal
}

const ModalForm = ({ isOpen, onClose, onSubmit, body, title = "Formulario", textActionOk, textActionCancel = "Cancelar", textConfirm, textBodyConfirm}: ModalProps) => {
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
                    
                    <button onClick={onClose} className="absolute top-2 right-2 text-purple-500 hover:text-gray-700 cursor-pointer">
                        ✖
                    </button>

                    <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>

                    <div className="mt-4 grid grid-cols-1 gap-3">{body}</div>

                    <div className="flex justify-end mt-5 space-x-3">
                        <button 
                            onClick={onClose} 
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg">
                            {textActionCancel}
                        </button>
                        <button 
                            onClick={() => setShowAlert(true)} 
                            className="bg-purple-500 hover:bg-purple-300 text-white font-bold py-3 px-4 rounded-lg">
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
