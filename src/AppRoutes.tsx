import { Navigate, Route, Routes } from "react-router-dom";
import Layaut from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layaut showHero={true}><HomePage/></Layaut>}/>
            <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
            <Route path="/search/:city" element={<Layaut showHero={false}><SearchPage/></Layaut>}/>
            <Route element={<ProtectedRoute/>}>
            <Route path="/user-profile" element={<Layaut showHero={false}><UserProfilePage/></Layaut>}/>
            <Route path="/manage-restaurant" element={<Layaut showHero={false}><ManageRestaurantPage/></Layaut>}/>
            </Route> 
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}
export default AppRoutes;