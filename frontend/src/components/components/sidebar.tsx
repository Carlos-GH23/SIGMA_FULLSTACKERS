import { useState } from "react";
import { HiHome,HiListBullet, HiUserGroup,HiMiniUsers,HiTruck,HiMiniCalendarDays,HiArrowLeftOnRectangle} from "react-icons/hi2";
import { FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); //Navegación para redireccionar

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-gray-500 text-white shadow-lg h-screen p-5 pt-8 ${isOpen ? "w-64" : "w-20"} duration-300 relative`}>
        {/* Botón de expandir/contraer */}
        <button
          className="absolute top-6 right-[-15px] bg-purple-600 text-white rounded-full p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiListBullet size={25} /> : <HiHome size={25}/>}
        </button>

        {/* Perfil */}
        <div className="flex items-center gap-x-4 mb-6">
          <img
            src="https://i.pinimg.com/736x/78/58/08/785808110027a3bd3c0086cf68ed6854.jpg"
            alt="User"
            className="w-10 h-10 rounded-full border-2 "
          />
          {isOpen && (
            <div>
              <h2 className="text-lg font-semibold">Jimmy Shergill</h2>
              <p className="text-sm text-white">info@jdash.com</p>
            </div>
          )}
        </div>

        {/* Menú */}
        <ul className="space-y-4">
          <li className="flex items-center gap-x-3 p-2 hover:bg-purple-500 rounded-lg cursor-pointer"
          onClick={() => navigate('inicio')}>
            <div className="text-purple-400">
              <HiHome size={30} />
            </div>
            {isOpen && <span>Inicio</span>}
          </li>
          <li className="flex items-center gap-x-3 p-2 hover:bg-purple-500 rounded-lg cursor-pointer"
          onClick={() => navigate('capturistas')}>
            <div className="text-purple-400">
              <HiUserGroup size={30} />
            </div>
            {isOpen && <span>Capturistas</span>}
          </li>
          <li className="flex items-center gap-x-3 p-2 hover:bg-purple-500 rounded-lg cursor-pointer relative"
          onClick={() => navigate('clientes')}>
            <div className="text-purple-400">
              <HiMiniUsers size={30} />
            </div>
            {isOpen && <span>Clientes</span>}

          </li>
          <li className="flex items-center gap-x-3 p-2 hover:bg-purple-500 rounded-lg cursor-pointer"
          onClick={() => navigate('vehiculos')}>
            <div className="text-purple-400">
              <FaCar size={30} />
            </div>
            {isOpen && <span>Vehiculos</span>}
          </li>
          <li className="flex items-center gap-x-3 p-2 hover:bg-purple-500 rounded-lg cursor-pointer"
          onClick={() => navigate('capturistas')}>
            <div className="text-purple-400">
              <HiMiniCalendarDays size={30} />
            </div>
            {isOpen && <span>Citas</span>}
          </li>
        </ul>

        {/* Logout */}
        <div className="absolute bottom-8 left-5 flex items-center gap-x-3 p-2 rounded-lg text-red-400 hover:bg-red-200 cursor-pointer">
          <HiArrowLeftOnRectangle size={30}/>
          {isOpen && <span>Cerrar Sesion</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
