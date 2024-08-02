import { useEffect, useState } from "react";
import styles from "./cssmodules/Transactions.module.css"
import Card from "./UI/Card";

interface Transaction{
    name: string;
    date: Date;
    spent: number
} 
type Transactions = Transaction[]

const Transactions: React.FC =()=>{
    const [transactions, setTransactions] = useState<Transactions>([])

    useEffect(()=>{
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
          try {
            const parsedTransactions = JSON.parse(storedTransactions);
            setTransactions(parsedTransactions);
          } catch (error) {
            console.error('Error parsing transactions:', error);
          }
        }
    },[])

    return (
        <div>
        <h2 className={styles.subtitle}>Recent Transactions</h2>
         <Card className={styles.container}>
         {transactions&& transactions.map((transaction) => (
          <div key={transaction.name}> {/* Use a unique key for each transaction */}
            <p>Name: {transaction.name}</p>
            <p>Date: {transaction.date.toLocaleDateString()}</p> <p>Spent: {transaction.spent}</p>
          </div>
        ))}

         </Card>
      </div>
    )
}

export default Transactions;