import { useEffect, useState } from 'react'
import './App.css'
import LogoTitle from './components/LogoTitle'
import Tracker from './components/tracker/Tracker';
import MemoizedTransactions from "./components/transactions/Transactions";
import TopExpenses from './components/TopExpenses';

// interface Transaction{
//   name: string;
//   date: Date;
//   category: string;
//   spent: number;
// } 
// type ExpenseList = Transaction[]

interface Wallet {
  balance: number;
  expenses: number;
}

function App() {

  const [expenseList, setExpenseList] = useState([])
  const [onChange, setOnChange] = useState(false);
  const [storedwallet, setStoredWallet] = useState<Wallet>({
    balance: 0,
    expenses: 0
  });

  const hadChange =()=>{
     setOnChange(prev=>!prev)
  }

useEffect(()=>{
  const wallet = localStorage.getItem("walletBalance")
  if(!wallet){
    const newWallet = {
      balance: 5000,
      expenses: 0
    }
    localStorage.setItem("walletBalance",`${JSON.stringify(newWallet)}`)    
  }
  else{
    setStoredWallet(JSON.parse(wallet))
  }
  

  const storedExpenses = localStorage.getItem("expenseList")
  if(storedExpenses){

   setExpenseList(JSON.parse(storedExpenses))
  }
 
},[])
useEffect(()=>{
  // console.log("::::ONCHNAGE:::")
  const storedExpenses = localStorage.getItem("expenseList")
  if(storedExpenses){
   setExpenseList(JSON.parse(storedExpenses))
  }

  const wallet = localStorage.getItem("walletBalance")
  if(wallet){
    setStoredWallet(JSON.parse(wallet))
  }
 
},[onChange])

// useEffect(()=>{
//   console.log("Expense DEBUG:: ",expenseList)
// },[expenseList])

  return (
    <>
      <LogoTitle title={"Expense Tracker"}/>
      <Tracker hadChange ={hadChange} storedWallet={storedwallet}/>
      <div className='statistics'>
        <MemoizedTransactions expenses={expenseList} hadChange ={hadChange }/>
        <TopExpenses onChange={onChange}/>
      </div>
      
    </>
  )
}

export default App
