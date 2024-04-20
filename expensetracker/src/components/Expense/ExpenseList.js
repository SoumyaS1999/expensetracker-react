import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
    console.log("Expense IDs:", expenses.map(expense => expense.id));
    return (
        <table class="table table-hover" style={{width:"700px", borderRadius:"12px"}}>
             <thead>
    <tr className='table-info'>
      <th scope="col">Amount</th>
      <th scope="col">Description</th>
      <th scope="col">Category</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
        <tbody style={{ backgroundColor: "#15172b !important" }}>

            {expenses.map((expense) => (
                <ExpenseItem
                    id={expense.id}
                    amount={expense.amount}
                    description={expense.description}
                    category={expense.category}
                    onDelete={onDeleteExpense}
                />
                
            ))}
        </tbody>
        </table>
    );
}

export default ExpenseList;

