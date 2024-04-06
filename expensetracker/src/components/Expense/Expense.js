
import React, { useState, useEffect, useCallback } from 'react';
import ExpenseList from './ExpenseList';
import AddExpense from './AddExpense';

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]= useState(null);


    const fetchExpensesHandler = useCallback(async()=> {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("https://expense-tracker-7eef6-default-rtdb.firebaseio.com/expense.json");
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            const data = await response.json();

            const loadedExpenses = [];
      
            for (const key in data) {
                console.log(key,data[key]);
              loadedExpenses.push({
                id:key,
                amount: data[key].amount,
                description: data[key].description,
                category: data[key].category,
              });
            }
            console.log("loaded expense",loadedExpenses);
      
            setExpenses(loadedExpenses);


            //setIsLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error.message);
            setError(error.message);
        } 
        setIsLoading(false);
    },[]);

    
    useEffect(()=>{
        fetchExpensesHandler();
    },[fetchExpensesHandler]);

    
  async function addExpenseHandler(expense) {
    const response = await fetch(
        "https://expense-tracker-7eef6-default-rtdb.firebaseio.com/expense.json",
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
  }

  const deleteExpenseHandler = async (id) => {
    console.log(id);
    const response = await fetch(
        `https://expense-tracker-7eef6-default-rtdb.firebaseio.com/expense/${id}.json`,
        {
            method: "DELETE",
        }
    );

    
    console.log("Response status:", response.status);
    console.log("Response status text:", response.statusText);

    if (response.ok) {
        const updatedExpenses = expenses.filter(expense => expense.Id !== id);
        console.log("Updated expenses after deletion:", updatedExpenses);
        setExpenses(updatedExpenses);
        console.log("Updated expenses after deletion:", updatedExpenses);
        console.log("Expenses state updated successfully.");
        fetchExpensesHandler()
    } else {
        setError('Failed to delete expense');
        console.log("Error: Failed to delete expense.");
    }
}

  let content = <p>Found No Expenses.</p>;

  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} onDeleteExpense={deleteExpenseHandler} />;
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
    

    return (
        <div style={{display:"flex"}}>
            <div>
            <AddExpense onAddExpense={addExpenseHandler} />
            </div>
            
            <div style={{marginLeft:"200px"}}> 
            <button style={{backgroundColor: "#08d",
    borderRadius: "12px",
    border: "0",
    boxSizing: "border-box",
    color: "#eee",
    cursor: "pointer",
    fontSize: "18px",
    height: "50px",
    marginTop: "4%",
    outline: "0",
    textAlign: "center",
    width: "100%"}}
             onClick={fetchExpensesHandler}>
                All Expenses</button>
                <br></br>
                {content}
                </div>
        </div>
    );
}

export default Expense;
