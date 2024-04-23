import React,{useEffect} from 'react'
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../Store/expense';
import '../../App.css';

const Expense = () => {

  const expense= useSelector(state=>state.expense.items)
  const useremail=localStorage.getItem('email')

  const totalPrice = expense.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );
 
 const totalAmount= useSelector(state=>state.expense.totalAmount);

 const premium = useSelector(state=>state.expense.activatePremium);

 const theme= useSelector(state=>state.expense.toggleTheme);

  const dispatch= useDispatch();
  

  const fetchExpensesHandler = async()=> {
      
    try {
        
        const response = await fetch(`https://expense-tracker-7eef6-default-rtdb.firebaseio.com/expenses${useremail}.json`);
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

        if(total>4000){
          dispatch(expenseActions.activatePremium(true));
        }
        else{
          dispatch(expenseActions.activatePremium(false))
        }
        
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

  const activatepremiumHandler=()=>{
    dispatch(expenseActions.setPremium());
    console.log('user is premium')
  }

  const togglethemeHandler=()=>{
    dispatch(expenseActions.setTheme())
    const body = document.querySelector('body');
    if (theme) {
      body.style.backgroundColor = '#ffffff'; // Light theme background color
    } else {
      body.style.backgroundColor = 'black'; // Dark theme background color
    }
  }

  const downloadCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Description,Amount\n';
    
    expense.forEach((item) => {
      csvContent += `${item.id},${item.description},${item.amount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
  };

  //let content = <p>Found No Expenses.</p>;
  let content=(  <div>     <table class="table table-hover" style={{width:"700px", borderRadius:"12px"}}>
  <thead>
<tr className='table-info'>
<th scope="col">Amount</th>
<th scope="col">Description</th>
<th scope="col">Category</th>
<th scope="col">Delete</th>
</tr>
</thead>
</table>
<p style={{textAlign:'center',alignItems:'center',justifyContent:'center',width:'700px'}}>Found No Expenses.</p>
</div>  
)

  if (expense.length > 0) {
    content = <ExpenseList expenses={expense} onDeleteExpense={deleteHandler} />;
  }

  return (
    <div>
      <div style={{display:"flex"}}>
      <div style={{}}> <AddExpense /></div>
   
      <div style={{marginLeft:"50px", marginTop:"30px"}}><h3 style={{textAlign:"center",backgroundColor:" #15172b"}}>All Expenses</h3>{content}</div>
      <div style={{marginLeft:"50px", marginTop:"30px"}}> 
        <div class="card text-white bg-primary mb-3" style={{maxWidth:"20rem"}}>
          <div class="card-header">Total Expense</div>
          <div class="card-body">
          <p class="card-text">Your Total Expenses is<h4>Rs {totalPrice}</h4></p>
          {totalAmount > 10000 &&!premium && <button  class="btn btn-info" onClick={activatepremiumHandler}>Activate Premium</button>}
          {totalAmount > 10000 && premium && <button  class="btn btn-success" style={{margin:"auto"}} onClick={togglethemeHandler}>Change Theme</button>}
          {totalAmount > 10000 && premium && <button  class="btn btn-info" style={{marginTop:"4px"}} onClick={downloadCSV}>Download Expenses</button>}
          </div>
        </div>
         
         
      </div>
      </div>
    
    </div>
  )
}

export default Expense
