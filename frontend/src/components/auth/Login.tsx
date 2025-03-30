import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import React, { useState } from "react";
import ErrorMessage from "../General/ErrorMessage";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erroMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            console.log(response);
            //Regresar a home
            //navigate("/");
        } catch (err) {
            setErrorMessage("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 p-4 bg-linear-to-bl from-purple-500 to-orange-500">
            <div className="grid grid-cols-2 w-[60vw] h-[75vh] bg-white rounded-lg shadow-lg overflow-hidden">
                <div
                    className="flex flex-col justify-center items-center p-8 text-white"
                    style={{
                        backgroundImage: `url('https://i.pinimg.com/736x/23/aa/24/23aa246d19e14f4b8935dcaff5b693c1.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                </div>
                <div className="flex flex-col justify-center p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Inicio de Sesion</h1>
                    <p className="text-gray-500 mb-6">¡Bienvenido de nuevo!</p>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-lg mb-1">Correo Electronico</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                placeholder="ejemplo123@gmail.com"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-lg mb-1">Constraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div>
                                <input type="checkbox" id="remember" className="mr-2" />
                                <label htmlFor="remember" className="text-gray-600">¿Recordar contraseña?</label>
                            </div>
                            <a href="#" className="text-purple-600 hover:underline">Olvide mi contraseña</a>
                        </div>
                        <button className="bg-purple-500 hover:bg-purple-300 text-white font-bold py-3 px-4 rounded-lg w-full text-lg">
                            Iniciar Sesion
                        </button>
                    </form>
                </div>
            </div>

            {erroMessage && <ErrorMessage message={erroMessage}/>}
        </div>
    );
};

export default Login;