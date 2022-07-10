import LoginPage from "src/pages/Login";
import NotFoundPage from "src/pages/NotFound";
import RegisterPage from "src/pages/Register";
import HomePage from "src/pages/Home";
import VehiclePage from "src/pages/Vehicle";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { parseCookies } from "nookies";
import { useEffect } from "react";





const Controller = () => {

    const navigate = useNavigate();
    
    const { pathname } = useLocation()

    useEffect(() => {
        const cookies = parseCookies();
        const coreLabToken = cookies['corelab.token']

        if(coreLabToken) {
            if(pathname === '/login' || pathname === '/register') {
                navigate('/', { replace: true })
            }
        } else {
            navigate('/login', { replace: true })
        }
    }, [navigate, pathname])

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/vehicle/:id" element={<VehiclePage />} />
        </Routes>
    )
}



export default Controller;