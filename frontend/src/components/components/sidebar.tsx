import { useState } from "react";
import { HiHome, HiListBullet, HiUserGroup, HiMiniUsers, HiMiniCalendarDays, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { FaCar } from "react-icons/fa";
import { MdHomeRepairService} from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { logout, getUser } from "../../services/AuthService";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Sidebar = ({ user }: { user: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Tu sesión se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const menuAdmin = [
    { name: "Inicio", path: "inicio", icon: <HiHome size={30} /> },
    { name: "Capturistas", path: "capturistas", icon: <HiUserGroup size={30} /> },
    { name: "Clientes", path: "clientes", icon: <HiMiniUsers size={30} /> },
    { name: "Vehiculos", path: "vehiculos", icon: <FaCar size={30} /> },
    { name: "Servicios", path: "servicios", icon: <MdHomeRepairService size={30} /> },
    { name: "Citas", path: "citas", icon: <HiMiniCalendarDays size={30} /> },
  ];


  const menuCapturist = [
    { name: "Inicio", path: "inicio", icon: <HiHome size={30} /> },
    { name: "Clientes", path: "clientes", icon: <HiMiniUsers size={30} /> },
    { name: "Vehiculos", path: "vehiculos", icon: <FaCar size={30} /> },
    { name: "Servicios", path: "servicios", icon: <MdHomeRepairService size={30} /> },
    { name: "Citas", path: "citas", icon: <HiMiniCalendarDays size={30} /> },
  ];


  if (user === 'admin')
    return (
      <div className="flex">
        <div className={`bg-gray-900 text-white shadow-lg h-screen p-5 pt-8 ${isOpen ? "w-64" : "w-21"} duration-300 relative`}>
          <button
            className="absolute top-6 right-[-15px] bg-purple-800 text-white rounded-full p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiChevronLeft size={25} /> : <HiChevronRight size={25} />}
          </button>

          <div className="flex items-center gap-x-4 mb-6">
            <img
              src="https://i.pinimg.com/736x/78/58/08/785808110027a3bd3c0086cf68ed6854.jpg"
              alt="User"
              className="w-10 h-10 rounded-full border-2 "
            />
            {isOpen && (
              <div className="flex flex-col max-w-xs overflow-hidden">
                <h2 className="text-lg font-semibold">{getUser()?.name ?? "Sin identidad"}</h2>
                <p className="text-sm text-white truncate">{getUser()?.email ?? "Sin identidad"}</p>
              </div>
            )}
          </div>
          
          <ul className="space-y-4">
            {menuAdmin.map((item) => (
              <li 
                key={item.path} 
                className={`flex items-center gap-x-3 p-2 rounded-lg cursor-pointer transition duration-300 w-full 
                  ${location.pathname.includes(item.path) ? "bg-purple-900 text-white" : "hover:bg-white hover:text-black"}`} 
                onClick={() => navigate(item.path)}
              >
                <span className={`${location.pathname.includes(item.path) ? "text-white" : "text-purple-500"}`}>
                  {item.icon}
                </span>
                {isOpen && <span>{item.name}</span>}
              </li>
            ))}
          </ul>


          <div 
            className="absolute bottom-8 left-5 flex items-center gap-x-3 p-2 rounded-lg text-purple-500 hover:bg-white hover:text-black cursor-pointer" 
            onClick={handleLogout}
          >
            <HiArrowLeftOnRectangle size={30} />
            {isOpen && <span>Cerrar Sesion</span>}
          </div>
        </div>
      </div>
    );
  if (user === 'capturista') {
    return (
      <div className="flex">
        <div className={`bg-gray-900 text-white shadow-lg h-screen p-5 pt-8 ${isOpen ? "w-64" : "w-21"} duration-300 relative`}>
          <button
            className="absolute top-6 right-[-15px] bg-purple-800 text-white rounded-full p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiChevronLeft size={25} /> : <HiChevronRight size={25} />}
          </button>

          <div className="flex items-center gap-x-4 mb-6">
            <img
              src="https://i.pinimg.com/736x/78/58/08/785808110027a3bd3c0086cf68ed6854.jpg"
              alt="User"
              className="w-10 h-10 rounded-full border-2 "
            />
            {isOpen && (
              <div className="flex flex-col max-w-xs overflow-hidden">
                <h2 className="text-lg font-semibold">{getUser()?.name ?? "Sin identidad"}</h2>
                <p className="text-sm text-white truncate">{getUser()?.email ?? "Sin identidad"}</p>
              </div>
            )}
          </div>
          
          <ul className="space-y-4">
            {menuCapturist.map((item) => (
              <li 
                key={item.path} 
                className={`flex items-center gap-x-3 p-2 rounded-lg cursor-pointer transition duration-300 w-full 
                  ${location.pathname.includes(item.path) ? "bg-purple-900 text-white" : "hover:bg-white hover:text-black"}`} 
                onClick={() => navigate(item.path)}
              >
                <span className={`${location.pathname.includes(item.path) ? "text-white" : "text-purple-500"}`}>
                  {item.icon}
                </span>
                {isOpen && <span>{item.name}</span>}
              </li>
            ))}
          </ul>


          <div 
            className="absolute bottom-8 left-5 flex items-center gap-x-3 p-2 rounded-lg text-purple-500 hover:bg-white hover:text-black cursor-pointer" 
            onClick={handleLogout}
          >
            <HiArrowLeftOnRectangle size={30} />
            {isOpen && <span>Cerrar Sesion</span>}
          </div>
        </div>
      </div>
    );
  }

};

export default Sidebar;
