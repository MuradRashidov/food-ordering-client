import { Navigate, Route, Routes } from "react-router-dom";
import Layaut from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layaut showHero={true}><HomePage/></Layaut>}/>
            <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
            <Route element={<ProtectedRoute/>}>
            <Route path="/user-profile" element={<Layaut showHero={false}><UserProfilePage/></Layaut>}/>
            </Route> 
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}
export default AppRoutes;