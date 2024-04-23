import {createSlice} from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialEmail = localStorage.getItem('email');


const initialAuthState= {
    isAuthenticated: initialToken ? true : false,
    token: initialToken || null,
    useremail:initialEmail || null
};

const authSlice=createSlice({
    name:"authentication",
    initialState: initialAuthState,
    reducers:{

        login(state,action){
            state.isAuthenticated= true;
            state.token= action.payload.token
            state.useremail=action.payload.useremail
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.useremail);
            alert("You are logged in");
            console.log('useremail is:',state.useremail)
        
        },
        logout(state){
            state.isAuthenticated= false
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            state.token=null;
            state.useremail=null
            alert("You are logged out");
        }
    }
})

export const authActions= authSlice.actions

export default authSlice.reducer;