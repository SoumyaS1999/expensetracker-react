import {Route, Routes } from "react-router-dom";
import { useContext } from "react";
//import ProductList from "../Products/ProductList";
//import About from "../Layouts/About";
import Index from "../Index/Index";
//import Movie from "../Movies/Movie";
//import Contactus from "../Contactus/Contactus";
//import ProductDetail from "../Products/ProductDetail";
import AuthForm from "../Auth/Authform";
import UserProfile from "../Profile/UserProfile";
import AuthContext from "../Store/auth-context";

const routePath = {
  Home: "/",
 // Store: "/store",
 // About: "/about",
 // Movie: "/movie",
 // Contactus: "/contactus",
 // Productdetail:"/store/:id",
  Login:"/login",
  Profile:"/profile"
};

const Routers = () => {

  const authCtx = useContext(AuthContext);

 // const isLoggedIn = authCtx.isLoggedIn;

  return (
    
      <Routes>
        <Route path={routePath.Home} element={<Index />} />

        {!authCtx.isLoggedIn && (<Route path={routePath.Login} element={<AuthForm />} />)}
        {authCtx.isLoggedIn && (<Route path={routePath.Profile} element={<UserProfile />} />)}
        <Route path="*" element={<Index />}/> 

      </Routes>
    
  );
};

export default Routers;