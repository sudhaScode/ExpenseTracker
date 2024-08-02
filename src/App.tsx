import { useEffect, useState } from 'react'
import './App.css'
import LogoTitle from './components/LogoTitle'
import Tracker from './components/tracker/Tracker';
import Transactions from "./components/Transactions";
import TopExpenses from './components/TopExpenses';

// interface Transaction{
//   name: string;
//   date: Date;
//   spent: number
// }
// interface TransactionsType{
//   transactions: Transaction[]
// }

function App() {

  // const [transactions, setTrasactions] = useState<TransactionsType>()

useEffect(()=>{
  localStorage.setItem("walletBalance","5000")
  localStorage.setItem("expenses","0")
  // const transactionsData:TransactionsType = JSON.parse(localStorage.getItem("transactions"))
  // setTrasactions(transactionsData)
},[])

  return (
    <>
      <LogoTitle title={"Expense Tracker"}/>
      <Tracker/>
      <div className='statistics'>
        <Transactions/>
        <TopExpenses/>
      </div>
    </>
  )
}

export default App
