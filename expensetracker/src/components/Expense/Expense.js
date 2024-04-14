import React,{useEffect} from 'react'
import AddExpense from './AddExpense';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../Store/expense';

const Expense = () => {

  const expense= useSelector(state=>state.expense.items)
 
 const totalAmount= useSelector(state=>state.expense.totalAmount);

  const dispatch= useDispatch();
  

  const fetchExpensesHandler = async()=> {
      
    try {
        
        const response = await fetch("https://expense-tracker-7eef6-default-rtdb.firebaseio.com/expenses.json");
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();

        const loadedExpenses = [];

        let total=0;
  
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,

          
          })
          total += Number(data[key].amount);
        }
     
        dispatch(expenseActions.setExpenses(loadedExpenses))
        dispatch(expenseActions.setTotal(total));
        
        //setIsLoading(false);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        
    } 
    
};

useEffect(()=>{
  fetchExpensesHandler();
},[]);



  const deleteHandler=(id)=>{
    dispatch(expenseActions.deleteExpense(id));
    setTimeout(()=>{
      fetchExpensesHandler();
    },2000)
  
     // fetchExpensesHandler();
  }

  return (
    <div>
    <AddExpense />
    {totalAmount}
    <ul>
        {expense.map((expense) => (
          <li key={expense.id}>
            Id: {expense.id} ,Amount: {expense.amount}, Description: {expense.description}, Category: {expense.category}
            <button onClick={()=>deleteHandler(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Expense
