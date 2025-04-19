import axios from "axios";
import { useState } from "react";
import ErrorMessage from "../components/General/ErrorMessage";
import SuccessMessage from "../components/General/SuccessMessage";
import { API_ENDPOINTS } from "../components/General/ApiConfig";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("")
  const [erroMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleRecovery = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      await axios.post(API_ENDPOINTS.resertPassword, { email });
      setSuccess("");
      setTimeout(() => setSuccess("Revisa tu correo electronico ya puedes cerrar esta pagina"), 10);
    } catch (error) {
      setErrorMessage("")
      setTimeout(() => setErrorMessage("Correo no existente favor prueba con otro"), 10);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4 bg-linear-to-bl from-purple-500 to-orange-500">
      <div className="w-[40vw]  bg-white rounded-lg drop-shadow-lg overflow-hidden justify-center items-center">
        <h1 className="text-center mt-4 text-2xl font-bold text-gray-800 mb-1">Cambio de Contraseña</h1>
        <p className="text-justify mx-4 text-gray-500 mb-2">favor de poner tu correo electronico despues revisa tu correo para que despues pongas el token que se te envio directo en el siguiente campo.</p>
        <form className="space-y-4 mt-4" action="" onSubmit={handleRecovery}>
          <div className="mx-4">
            <label htmlFor="email" className="block text-gray-700 text-lg mb-1">Correo Electronico</label>
            <input onChange={(e)=> setEmail(e.target.value)} type="email" id="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400" name="email" />
            <button className="my-4 bg-purple-500 hover:bg-purple-300 text-white font-bold py-3 px-4 rounded-lg w-full text-lg">
              Cambiar mi Contraseña
            </button>
          </div>
        </form>

      </div>
      {success && <SuccessMessage message={success}/>}
      {erroMessage && <ErrorMessage message={erroMessage}/>}
    </div>
  );
};

export default PasswordRecovery;
