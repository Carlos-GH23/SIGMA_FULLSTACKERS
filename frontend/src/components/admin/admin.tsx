import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const Admin = () => {
    return (
        <div className="flex h-screen overflow-hidden">
        <div className="h-full">
            <Sidebar user="admin" />
        </div>
        <div className="flex-1 p-4 overflow-auto  bg-gray-400">
            <Outlet />
        </div>
    </div>
    );
};

export default Admin;