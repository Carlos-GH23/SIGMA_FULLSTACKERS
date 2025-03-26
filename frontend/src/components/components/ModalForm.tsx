import { useEffect } from "react";

import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const ModalForm = ({ isOpen, onClose, children }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (event: { key: string; }) => {
            if (event.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">

            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalForm;
