import { useState } from "react";
import { HiHome, HiListBullet, HiUserGroup, HiMiniUsers, HiMiniCalendarDays, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user }: { user: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); //Navegación para redireccionar
  if (user === 'admin')
    return (
      <div className="flex">
        <div className={`bg-black text-white shadow-lg h-screen p-5 pt-8 ${isOpen ? "w-64" : "w-20"} duration-300 relative`}>
          {/* Botón de expandir/contraer */}
          <button
            className="absolute top-6 right-[-15px] bg-purple-600 text-white rounded-full p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiListBullet size={25} /> : <HiListBullet size={25} />}
          </button>

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
          <ul className="space-y-4">
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer">
              <HiHome className="text-purple-400" size={30} />
              {isOpen && <span>Inicio</span>}
            </li>
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer">
              <HiUserGroup className="text-purple-400" size={30} />
              {isOpen && <span>Capturistas</span>}
            </li>
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer relative">
              <HiMiniUsers className="text-purple-400" size={30} />
              {isOpen && <span>Clientes</span>}
            </li>
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer">
              <FaCar className="text-purple-400" size={30} />
              {isOpen && <span>Vehiculos</span>}
            </li>
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer">
              <HiMiniCalendarDays className="text-purple-400" size={30} />
              {isOpen && <span>Citas</span>}
            </li>
          </ul>
          <div className="absolute bottom-8 left-5 flex items-center gap-x-3 p-2 rounded-lg text-purple-400 hover:bg-white cursor-pointer">
            <HiArrowLeftOnRectangle size={30} />
            {isOpen && <span>Cerrar Sesion</span>}
          </div>
        </div>
      </div>
    );
  if (user === 'capturista') {
    return (
      <div className="flex">

        <div className={`bg-black text-white shadow-lg h-screen p-5 pt-8 ${isOpen ? "w-64" : "w-20"} duration-300 relative`}>

          <button
            className="absolute top-6 right-[-15px] bg-purple-600 text-white rounded-full p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiListBullet size={25} /> : <HiListBullet size={25} />}
          </button>

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

          <ul className="space-y-4">
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer"
              onClick={() => navigate('inicio')}>
              <HiHome className="text-purple-400" size={30} />
              {isOpen && <span>Inicio</span>}
            </li>
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer relative">
              <HiMiniUsers className="text-purple-400" size={30} />
              {isOpen && <span>Clientes</span>}
            </li>
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer">
              <FaCar className="text-purple-400" size={30} />
              {isOpen && <span>Vehiculos</span>}
            </li>
            <li className="flex items-center gap-x-3 p-2 hover:bg-white rounded-lg cursor-pointer">
              <HiMiniCalendarDays className="text-purple-400" size={30} />
              {isOpen && <span>Citas</span>}
            </li>
          </ul>
          <div className="absolute bottom-8 left-5 flex items-center gap-x-3 p-2 rounded-lg text-purple-400 hover:bg-white cursor-pointer">
            <HiArrowLeftOnRectangle size={30} />
            {isOpen && <span>Cerrar Sesion</span>}
          </div>
        </div>
      </div>
    );
  }

};

export default Sidebar;
