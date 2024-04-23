import React from 'react'
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate=useNavigate();
  return (
    <div>
    <div class="alert alert-dismissible alert-info">
    <h3 style={{textAlign:'center'}}>Welcome to Expense Tracker</h3>
    </div>
    <div style={{display:'flex',justifyContent:'center'}}>
      <div class="card text-white bg-success mb-3" style={{maxWidth:"20rem",margin:'auto'}}>
        <div class="card-header">Expense Tracking</div>
        <div class="card-body">
        
        <p class="card-text">Enables users to log and categorize their expenses, providing a detailed record of where money is spent,
         including amounts, descriptions, dates, and categories</p>
        </div>
      </div>

      <div class="card text-white bg-warning mb-3" style={{maxWidth:"20rem",margin:'auto'}}>
        <div class="card-header">Budget Management</div>
        <div class="card-body">
        
        <p class="card-text">Allows users to set, monitor, and manage budgets for different categories or time periods, helping them to stay within their financial limits
         and achieve their savings goals.</p>
        </div>
      </div>

      <div class="card text-white bg-danger mb-3" style={{maxWidth:"20rem",margin:'auto'}}>
        <div class="card-header">Income Tracking</div>
        <div class="card-body">
        
        <p class="card-text">Provides a platform for users to input and categorize their income sources, giving a comprehensive view of both income and expenses
         to better understand their overall situation.</p>
        </div>
      </div>

    </div>



    <div style={{display:'flex',justifyContent:'center'}}>
      <div class="card text-white bg-success mb-3" style={{maxWidth:"20rem",margin:'auto'}}>
        <div class="card-header">Multiple Currency Support</div>
        <div class="card-body">
        
        <p class="card-text">Supports multiple currencies and exchange rates, allowing users to track expenses and income in 
        different currencies and convert amounts accurately</p>
        </div>
      </div>

      <div class="card text-white bg-warning mb-3" style={{maxWidth:"20rem",margin:'auto'}}>
        <div class="card-header">Secure Data Protection</div>
        <div class="card-body">
        
        <p class="card-text">Implements strong security measures, such as encryption and authentication,
         to protect users' sensitive financial data and ensure protection, privacy and confidentiality.</p>
        </div>
      </div>

      <div class="card text-white bg-danger mb-3" style={{maxWidth:"20rem",margin:'auto'}}>
        <div class="card-header">Cloud Sync and Backup</div>
        <div class="card-body">
        
        <p class="card-text">Offers cloud synchronization and backup features to securely store and access expense data across multiple devices,
         ensuring data integrity and availability.</p>
        </div>
      </div>

    </div>




    <footer class="alert alert-dismissible alert-light" style={{ position: "fixed", bottom: "0", width: "100%" }}>
    <h4 style={{ textAlign: 'center' }}>Create an account to use our features</h4>
    <div style={{width:"100%", textAlign:"center"}}>
    <a style={{ textAlign: 'center',alignItems:'center'}} href='/login'>Click here for login</a>
    </div>
    </footer>
    </div>
  )
}

export default Index;
