import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/General/ErrorMessage";
import SuccessMessage from "../components/General/SuccessMessage";

const FormRecovery = () => {
    const navigate = useNavigate();
    const location = useLocation();  
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [erroMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState("");

    // Extraer los parámetros uid y token de la URL
    const urlParams = new URLSearchParams(location.search);
    const uid = urlParams.get('uid');
    const token = urlParams.get('token');

    // Función que maneja el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar si las contraseñas coinciden
        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            await axios.post('http://localhost:8000/users/password-reset/confirm/', {
                uid: uid,
                token: token,
                new_password: newPassword,
            }).then
            // Si la respuesta es exitosa, mostrar mensaje de éxito
            setSuccess('Contraseña restablecida con éxito ya puedes ir al login');
            setErrorMessage(''); // Limpiar errores anteriores
        } catch (error) {
            // Manejar errores de la solicitud
            setErrorMessage('Hubo un error al restablecer la contraseña. Intenta de nuevo.');
            setSuccess('');
        }
    };

    return (
        <div>
            <div className="h-screen flex items-center justify-center bg-gray-100 p-4 bg-linear-to-bl from-purple-500 to-orange-500">
                <div className="w-[40vw]  bg-white rounded-lg drop-shadow-lg overflow-hidden justify-center items-center">
                    <div className="flex flex-col justify-center p-8">
                        <h1 className="text-center mt-4 text-2xl font-bold text-gray-800 mb-1">Cambio de Contraseña</h1>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg mb-1">Nueva Contraseña:</label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-lg mb-1">Confirmar Contraseña:</label>
                                <input
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="bg-purple-500 hover:bg-purple-300 text-white font-bold py-3 px-4 rounded-lg w-full text-lg" 
                            type="submit">Restablecer Contraseña</button>
                        </form>
                    </div>
                </div>


            </div>
            {success && <SuccessMessage message={success} />}
            {erroMessage && <ErrorMessage message={erroMessage} />}
        </div>
    );
};
export default FormRecovery;
