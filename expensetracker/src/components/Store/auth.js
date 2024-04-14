import {createSlice} from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');

const initialAuthState= {
    isAuthenticated: initialToken ? true : false,
    token: initialToken || null
};

const authSlice=createSlice({
    name:"authentication",
    initialState: initialAuthState,
    reducers:{

        login(state,action){
            state.isAuthenticated= true;
            state.token= action.payload
            localStorage.setItem('token', action.payload);
        },
        logout(state){
            state.isAuthenticated= false
            localStorage.removeItem('token');
        }
    }
})

export const authActions= authSlice.actions

export default authSlice.reducer;