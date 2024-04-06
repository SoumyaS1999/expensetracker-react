import React from 'react'
import { useRef } from "react";
import "./Expense.css"

const AddExpense = (props) => {
    const amountRef = useRef("");
    const descriptionRef = useRef("");
    const categoryRef = useRef("");
  
    function submitHandler(event) {
      event.preventDefault();
  
      // couldadd validation here...
  
      const expense = {
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      };
  
      props.onAddExpense(expense);
    }
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
