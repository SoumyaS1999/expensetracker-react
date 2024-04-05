import { useState, useRef , useContext} from "react";
import AuthContext from "../Store/auth-context";
//import { Redirect } from 'react-router-dom';
import classes from "./Authform.module.css";
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const Navigate= useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
        url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAysHuvFXa07LIxOJi5WvSY-OSNV7r2FZA"
    } 
    else {
        url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAysHuvFXa07LIxOJi5WvSY-OSNV7r2FZA"
    }
    fetch( url,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "EMAIL_EXISTS!";
            console.log(data);

            //alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data)=>{
        authCtx.login(data.idToken);
        console.log(data);
        Navigate('/profile');
        //alert('Login Successful')
      })
      .catch((err)=>{
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;