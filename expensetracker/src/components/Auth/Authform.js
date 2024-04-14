import React from 'react'
import { useRef } from 'react'
import {useDispatch} from 'react-redux'
import { authActions } from '../Store/auth';

const Authform = () => {
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
          let errorMessage = "EMAIL_EXISTS!";
          console.log(data);

          //alert(errorMessage);
          throw new Error(errorMessage);
        });
      }
    })
    .then((data)=>{
      //authCtx.login(data.idToken);
      dispatch(authActions.login(data.idToken));
      console.log(data);
    })
    .catch((err)=>{
      alert(err.message);
    });

    //dispatch(authActions.login());
  }
  return (
    <div>
      <h1>Login </h1>
      <div>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor="email" >Email</label>
            <input id="email" className='email' type='email' ref={emailRef} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" className='password' type='password' ref={passwordRef}/>
          </div>
          <div>
            <button type='submit'>Submit</button>
           
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authform
