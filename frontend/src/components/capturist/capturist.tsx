import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const Capturist = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="h-full">
                <Sidebar user="capturista" />
            </div>
            <div className="flex-1  p-4 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
  };
  
export default Capturist;