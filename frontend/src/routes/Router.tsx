import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServerError from "../pages/ServerError";
import NotFound from "../pages/NotFound";
import Login from "../components/auth/Login";
import Admin from "../components/admin/admin";
import ListCars from "../components/components/Listcars";
import Capturist from "../components/capturist/capturist";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                ---/* Ruta del Login */---
                <Route path="/" element={<Login></Login>} />

                ---/* Rutas del Admin*/---
                <Route path="/admin" element={<Admin/>}>
                    <Route path="vehiculos" element={<ListCars/>}></Route>
                </Route>

                --/* Rutas para mis Capturistas*/--
                <Route path="/capturista" element={<Capturist/>}>
                    
                </Route>

                --/* Paginas de Error */--
                <Route path="/500" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}
export default AppRouter;