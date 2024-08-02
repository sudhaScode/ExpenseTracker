import { useEffect, useState } from "react";
import styles from "../cssmodules/Tracker.css.module.css";
import Card from "../UI/Card";

interface balanceObj {
  walletBalance: number;
  expenses: number;
}

const Tracker: React.FC = () => {
  const [balance, setBalance] = useState<balanceObj>({walletBalance: 0,expenses: 0});
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  // const balance: balanceType={
  //   walletBalance: Number(localStorage.getItem("walletBalance")),
  //    expenses: Number(localStorage.getItem("expenses"))
  // }

  const modalHander =(event:MouseEvent)=>{
    console.log(event)
    setModalOpen(true)
  }
  
  useEffect(() => {
    setBalance({
      walletBalance: Number(localStorage.getItem("walletBalance")),
      expenses: Number(localStorage.getItem("expenses")),
    });
  }, []);

  
  return (
    <>
    {isModalOpen ?"":
    <Card className={styles.tracker}>
      <div className={styles.container}>
        <div className={styles["sub-container"]}>
          <Card className={styles.balance}>
            <h1 className={styles.wallet}>
              Wallet Balance: <span>₹{balance.walletBalance}</span>
            </h1>
            <button className={styles["wallet-button"]}  name = "add-expense" onClick={(event)=>modalHander(event)}>+ Add Income</button>
          </Card>
          <Card className={styles.balance}>
            <h1 className={styles.expense}>
              Expenses: <span>₹{balance.expenses}</span>
            </h1>
            <button className={styles["expense-button"]} name = "add-expense" onClick={(event)=>modalHander(event)}>+ Add Expense</button>
          </Card>
        </div>
        <div className={styles.chart}></div>
      </div>
    </Card>
    }</>
  );
};

export default Tracker;
