import React from 'react'
import { useRef } from 'react'
import {useDispatch} from 'react-redux'
import { authActions } from '../Store/auth';
import {useNavigate} from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

const Authform = () => {
  const navigate= useNavigate();
  const emailRef= useRef();
  const passwordRef=useRef();

  const dispatch= useDispatch();

  const loginHandler=(event)=>{
    event.preventDefault();
    console.log("user-loggedin")
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    fetch( "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAysHuvFXa07LIxOJi5WvSY-OSNV7r2FZA",
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
          let errorMessage = "Incorrect Email or Password!";
          console.log(data);

          //alert(errorMessage);
          throw new Error(errorMessage);
        });
      }
    })
    .then((data)=>{
      //authCtx.login(data.idToken);
      dispatch(authActions.login({token: data.idToken, useremail: data.localId}));
      console.log(data);
      navigate('/expense');
      
    })
    .catch((err)=>{
      alert(err.message);
    });

    //dispatch(authActions.login());
  }

  const signupHandler=()=>{
    navigate('/signup');
  }
  const resetPasswordHandler=()=>{
    navigate('/resetpassword');
  }
  return (
    <div style={


      {
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
      }
    }>
      <div>
        <form onSubmit={loginHandler}  className="formexpense" style={{minHeight:"600px", minWidth:"400px"}}>
        <div class="title">Welcome</div>
      <div class="subtitle">Login to Expense Tracker</div>
          <div class="input-container ic1">
            <input id="email" className='input' type='email' placeholder='Email' ref={emailRef} />
          </div>
          <div class="input-container ic1">
        
            <input id="password" className='input' type='password' placeholder='Password' ref={passwordRef}/>
          </div>
          <div>
            <button className='submit' type='submit'>Submit</button>
           </div>
           <div>
            <button className='submit' onClick={signupHandler}>New User Signup</button>
           </div>
           <div>
            <button className='submit' onClick={resetPasswordHandler}>Reset Password</button>
           </div>
        </form>
      </div>
    </div>
  )
}

export default Authform
