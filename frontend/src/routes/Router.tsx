import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ServerError from "../pages/ServerError";
import NotFound from "../pages/NotFound";
import Login from "../components/auth/Login";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                ---/* Ruta del Login */---
                <Route path="/" element={<Login></Login>} />

                ---/* Rutas del Admin*/---
                <Route path="/admin" element></Route>

                --/* Rutas para mis Capturistas*/--
                <Route path="/capturista" element></Route>

                --/* Rutas para mis Capturistas*/--
                <Route path="/capturista" element></Route>

                --/* Paginas de Error */--
                <Route path="/500" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}
export default AppRouter;