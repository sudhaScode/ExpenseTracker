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

function App() {

  const [expenseList, setExpenseList] = useState([])
  const [onChange, setOnChange] = useState(false)

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
 
},[onChange])

// useEffect(()=>{
//   console.log("Expense DEBUG:: ",expenseList)
// },[expenseList])

  return (
    <>
      <LogoTitle title={"Expense Tracker"}/>
      <Tracker hadChange ={hadChange }/>
      <div className='statistics'>
        <MemoizedTransactions expenses={expenseList} />
        <TopExpenses/>
      </div>
    </>
  )
}

export default App
