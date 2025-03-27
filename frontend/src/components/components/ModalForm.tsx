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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md md:max-w-xl lg:max-w-2xl 
                min-h-[40vh] max-h-[90vh] overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-purple-500 hover:text-gray-700">
                    ✖
                </button>
                <form className="mt-4 grid grid-cols-1 gap-3" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <label className="block text-sm font-medium">{key}</label>
                            <input
                                type={typeof value === "number" ? "number" : "text"}
                                value={String(value)}
                                onChange={(e) => onChange(key as keyof T, e.target.value)}
                                className="col-span-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                    ))}
                </form>
                <button type="submit" className="bg-purple-500 hover:bg-purple-300 text-white font-bold py-3 px-4 rounded-lg w-full text-lg mt-5">
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default ModalForm;
