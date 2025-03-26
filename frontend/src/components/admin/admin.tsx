import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const Admin = () => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="p-4 w-full">
                <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
            </div>
        </div>
    );
};

export default Admin;