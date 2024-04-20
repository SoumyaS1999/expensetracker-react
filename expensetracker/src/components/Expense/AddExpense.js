import React, { useEffect } from 'react'
import { useRef } from "react";
import "./Expense.css";
import { expenseActions } from '../Store/expense';
import { useDispatch } from 'react-redux';


const AddExpense = (props) => {
    const amountRef = useRef("");
    const descriptionRef = useRef("");
    const categoryRef = useRef("");
    const useremail=localStorage.getItem('email')

    const dispatch= useDispatch();
  
    function submitHandler(event) {
      event.preventDefault();
  
      // couldadd validation here...
  
      const expense = {
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      };
  
      console.log(expense.amount);
      console.log(expense.description);

      async function addExpenseHandler(expense) {
        const response = await fetch(
            `https://expense-tracker-7eef6-default-rtdb.firebaseio.com/expenses${useremail}.json`,
            {
              method: "POST",
              body: JSON.stringify(expense),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log('New expense added with ID:', data.name);
          console.log(data);
          fetchExpensesHandler();
          if(response.ok){
            dispatch(expenseActions.addExpense(expense));
          }
      }
      addExpenseHandler(expense);
     // dispatch(expenseActions.addExpense(expense));
    }

    const fetchExpensesHandler = async()=> {
      
      try {
          const response = await fetch(`https://expense-tracker-7eef6-default-rtdb.firebaseio.com/expenses${useremail}.json`);
          if (!response.ok) {
              throw new Error('Failed to fetch movies');
          }
          const data = await response.json();

          const loadedExpenses = [];
    
          for (const key in data) {
            loadedExpenses.push({
              id: key,
              amount: data[key].amount,
              description: data[key].description,
              category: data[key].category,

            });
          }
          dispatch(expenseActions.setExpenses(loadedExpenses))
          //setIsLoading(false);
      } catch (error) {
          console.error('Error fetching movies:', error.message);
          
      } 
      
  };

 // useEffect(()=>{
 //   fetchExpensesHandler();
//},[]);
  return (
   
    <form onSubmit={submitHandler} className="formexpense">
      <div class="title">Welcome</div>
      <div class="subtitle">Add Your Expenses</div>
      <div class="input-container ic1">
        <input type="number" id="amount" class="input" ref={amountRef} placeholder="Add Amount" />
        
      </div>
      <div class="input-container ic2">
        <input id="description" class="input" type="text" ref={descriptionRef} placeholder="Description" />
       
      </div>

      <div className="input-container ic2">
      <select className="input" id="category" name="category" ref={categoryRef} >
        <option>Fuel</option>
        <option>Food</option>
        <option>Electricity</option>
        <option>Rent</option>
      </select>
    </div>

      <button type="submit" class="submit">submit</button>
    </form>
    
    
  )
}

export default AddExpense
