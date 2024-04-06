import {Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Index from "../Index/Index";
import AuthForm from "../Auth/Authform";
import UserProfile from "../Profile/UserProfile";
import ResetPassword from "../Password/ResetPassword"; 
import Expense from "../Expense/Expense";
import AuthContext from "../Store/auth-context";

const routePath = {
  Home: "/",
  Login:"/login",
  Profile:"/profile",
  ResetPassword:"/resetpassword",
  Expense:"/expense"
};

const Routers = () => {

  const authCtx = useContext(AuthContext);

 // const isLoggedIn = authCtx.isLoggedIn;

  return (
    
      <Routes>
        <Route path={routePath.Home} element={<Index />} />
        <Route path={routePath.ResetPassword} element={<ResetPassword />} />
        <Route path={routePath.Expense} element={<Expense />} />
        {!authCtx.isLoggedIn && (<Route path={routePath.Login} element={<AuthForm />} />)}
        {authCtx.isLoggedIn && (<Route path={routePath.Profile} element={<UserProfile />} />)}
        <Route path="*" element={<Index />}/> 

      </Routes>
    
  );
};

export default Routers;