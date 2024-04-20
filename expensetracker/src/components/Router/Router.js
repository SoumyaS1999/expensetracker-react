import {Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Index from "../Index/Index";
import AuthForm from "../Auth/Authform";
import UserProfile from "../Profile/UserProfile";
import ResetPassword from "../Password/ResetPassword"; 
import Expense from "../Expense/Expense";
import Signup from "../Auth/Signup";
//import AuthContext from "../Store/auth-context";
import { authActions } from "../Store/auth";
import { useSelector } from "react-redux";


const routePath = {
  Home: "/",
  Login:"/login",
  Signup:"/signup",
  Profile:"/profile",
  ResetPassword:"/resetpassword",
  Expense:"/expense"
};

const Routers = () => {
  const islogin= useSelector(state=>state.auth.isAuthenticated);


  return (
    
      <Routes>
        <Route path={routePath.Home} element={<Index />} />
        <Route path={routePath.ResetPassword} element={<ResetPassword />} />
        {islogin && <Route path={routePath.Expense} element={<Expense />} />}
        <Route path={routePath.Login} element={<AuthForm />} />
        <Route path={routePath.Signup} element={<Signup />} />
        {islogin &&<Route path={routePath.Profile} element={<UserProfile />} />}
        <Route path="*" element={<Index />}/> 

      </Routes>
    
  );
};

export default Routers;