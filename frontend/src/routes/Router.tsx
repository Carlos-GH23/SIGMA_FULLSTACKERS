import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ServerError from "../pages/ServerError";
import NotFound from "../pages/NotFound";
import Login from "../components/auth/Login";
import Admin from "../components/admin/admin";
import ListCars from "../components/components/Listcars";
import Capturist from "../components/capturist/capturist";
import ListCapturistas from "../components/admin/Listcapturist";
import { isAdmin, isLoggedIn } from "../services/AuthService";
import { AnimatePresence } from "framer-motion";
import ListClients from "../components/components/ListClients";
import ListServices from "../components/components/ListServices";
import PasswordRecovery from "../pages/passwordrecovery";
import FormRecovery from "../pages/formRecovery";

const AppRouter = () => {
    const location = useLocation();
    const loggedIn = isLoggedIn();
    const admin = isAdmin();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
              
                <Route path="/" element={loggedIn ? <Navigate to={admin ? "/admin" : "/capturista"} /> : <Login />} />

                {admin && (
                    <Route path="/admin" element={<Admin />}>
                        <Route path="capturistas" element={<ListCapturistas />} />
                        <Route path="clientes" element={<ListClients />} />
                        <Route path="vehiculos" element={<ListCars />} />
                        <Route path="servicios" element={<ListServices />} />
                    </Route>
                )}

                {!admin && loggedIn && (
                    <Route path="/capturista" element={<Capturist/>}>
                        <Route path="clientes" element={<ListClients />} />
                        <Route path="vehiculos" element={<ListCars />} />
                        <Route path="servicios" element={<ListServices />} />
                    </Route>
                )}

                <Route path="/500" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/recovery" element={<PasswordRecovery/>}></Route>
                <Route path="/reset-password" element={<FormRecovery/>} />

            </Routes>
        </AnimatePresence>
    )
}
export default AppRouter;