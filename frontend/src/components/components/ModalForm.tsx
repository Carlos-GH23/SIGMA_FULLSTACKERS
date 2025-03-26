import { useEffect } from "react";

interface ModalProps<T extends Record<string, any>> {
    isOpen: boolean;
    onClose: () => void;
    formData: T;
    onChange: (key: keyof T, value: string | number | Date) => void;
    onSubmit: () => void;
}

const ModalForm = <T extends Record<string, any>>({ isOpen, onClose, formData, onChange, onSubmit }: ModalProps<T>) => {
    useEffect(() => {
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Formulario</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <label className="block text-sm font-medium">{key}</label>
                            <input
                                type={typeof value === "number" ? "number" : "text"}
                                value={String(value)}
                                onChange={(e) => onChange(key as keyof T, e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ))}
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
