// expensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const Email = localStorage.getItem('email');


const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items:[],  // Initialize items as an empty array
    isLoading: false,
    error: null,
    totalAmount: 0,
    toggleTheme: true,
    activatePremium: false

  },
  reducers: {
    addExpense: {
        reducer: (state, action) => {

         state.items.push(action.payload);
         console.log(action.payload);
         state.totalAmount=state.totalAmount+Number(action.payload.amount);
        
        },
    },
      
    deleteExpense: {
        reducer: (state, action) => {
          state.items = state.items.filter(expense => expense.id !== action.payload);
        },
        prepare: async (id) => {
          const response = await fetch(
            `https://expense-tracker-7eef6-default-rtdb.firebaseio.com//expenses${Email}/${id}.json`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            alert("Item is deleted");
            return { payload: id };
          } else {
            alert("Failed to delete item");
            return { payload: null };
          }
        },
      },
    setExpenses: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTotal:(state,action)=>{
        state.totalAmount= action.payload;
    },
    setTheme:(state)=>{
        state.toggleTheme= !state.toggleTheme;
        console.log("theme changed")
    },
    setPremium:(state)=>{
        state.activatePremium= true;
        console.log("setpremium reducer")
    }
  },
});

export const expenseActions = expensesSlice.actions;

export default expensesSlice.reducer;
