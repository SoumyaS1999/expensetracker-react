import React from 'react';

const ExpenseItem = ({ id,amount,description,category, onDelete  }) => {
    console.log("keys are:",{id})
    return (
        
  <tr class="table-active">
            <td>{amount}</td>
            <td>{description}</td>
            <td>{category}</td>
            <td>
                <button className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
            </td>
        </tr>
        
        
        
    );
}

export default ExpenseItem;
