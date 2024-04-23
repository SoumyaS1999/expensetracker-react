import React from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate= useNavigate();
    const emailRef= useRef();
    const passwordRef=useRef();
  
    //const dispatch= useDispatch();
  
    const signupHandler=(event)=>{
      event.preventDefault();
      console.log("user-signedup")
      console.log(emailRef.current.value);
      console.log(passwordRef.current.value);
  
      const enteredEmail = emailRef.current.value;
      const enteredPassword = passwordRef.current.value;
      fetch( "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAysHuvFXa07LIxOJi5WvSY-OSNV7r2FZA",
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
        //authCtx.login(data.idToken);
       // dispatch(authActions.login(data.idToken));
       navigate('/login')
        console.log(data);
      })
      .catch((err)=>{
        alert(err.message);
      });
  
      //dispatch(authActions.login());
    }
    const loginHandler=()=>{
        navigate('/login')
    }
    return (
      <div>
        <div>
          <form onSubmit={signupHandler} className="formexpense" style={{minHeight:"500px", minWidth:"350px"}}>
          <div class="title">Welcome</div>
      <div class="subtitle">Signup to Expense Tracker</div>
            <div class="input-container ic1">
              <input id="email" className='input' type='email' ref={emailRef} />
            </div>
            <div class="input-container ic1">
              <input id="password" className='input' type='password' ref={passwordRef}/>
            </div>
            <div>
              <button type='submit' className='submit'>Submit</button>
             </div>
             <div>
              <button className='submit' onClick={loginHandler}>Existing User Login</button>
             </div>
          </form>
        </div>
      </div>
    )

}

export default Signup
