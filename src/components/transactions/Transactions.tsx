import { useEffect, useState } from "react";
import styles from "../cssmodules/Transactions.module.css"
import Card from "../UI/Card";

import { memo } from "react";
import foodIcon from "../../assets/EntertainementExpenseIcon.png"
import entertainmentIcon from "../../assets/EntertainementExpenseIcon.png";
import travelIcon from "../../assets/TravelExpenseIcon.png"
import leftArrow from  "../../assets/leftArrow1.png"
import rightArrow from "../../assets/rightArrow1.png"
import removeIcon from "../../assets/remove.png"
import editIcon from "../../assets/edit.png"

interface Transaction{
    title: string;
    date: Date;
    category: string;
    price: number;
} 
type ExpenseList = Transaction[]
interface TransactionList{
  expenses: Transaction[]
}

const Transactions: React.FC<TransactionList>= ({expenses})=>{
  // const [expenseList, setExpenseList] = useState<ExpenseList>([])
  const [pages, setPages] = useState<number[]>([])
  const [currentItems, setCurrentItems] = useState<ExpenseList>([])
  const [currentPage, setCurrentPage] = useState<number>(1);



  const formatDate = (date: Date)=>{
         const dateObj = new Date(date)
         return dateObj.toLocaleDateString("en-US",{
          year: 'numeric',
          month: "long",
          day: "numeric"
         })
  }

  const handlePrevButton=()=>{
    if(currentPage >1){
      setCurrentPage(prev=>prev-1)
    }

  }
  const handleNextButton=()=>{
    // console.log(currentPage, pages.length)
       if(currentPage <= pages.length-1){
        setCurrentPage(prev=>prev+1)
       }
  }

  useEffect(()=>{
    const length = expenses.length;

    // three times for page
    const pagesRequired = Math.ceil(length/3)
    // console.log("DEBUG", pagesRequired)
     const list =  new Array(pagesRequired).fill(0).map((_,i)=>i+1)
    //  console.log("Required Pages:: ", list)
     setPages(list)
  },[expenses])

  useEffect(()=>{
    if(currentPage ===1){
      const items = expenses.slice(currentPage-1, currentPage*3);
      setCurrentItems(items)
    }
    else{
      const items = expenses.slice(currentPage+1, currentPage*3);
      setCurrentItems(items)
    }
    // console.log(items)
    

  },[pages,currentPage])

  // useEffect(()=>{
  //   console.log("Current Items:: ", pages)
  // },[currentItems])

    return (
        <div>
        <h2 className={styles.subtitle}>Recent Transactions</h2>
         <Card className={styles.container}>
          {
             currentItems && currentItems.map((item,index)=><>
             {item.category.toLocaleLowerCase() === "food" &&<div key={`${index} ${item.title}`} className={styles["items-container"]}>
                    <div className={styles["left-info"]}>
                       <img src={foodIcon} alt="Food"/>
                       <ul >
                        <li className={styles["item-title"]}>{item.title}</li>
                        <li className={styles["item-date"]}>{formatDate(item.date)}</li>
                       </ul>
                    </div>
                    <div className={styles["right-info"]}>  
                      <p className={styles["item-price"]}>₹{item.price}</p>
                      <div className={styles["right-actions"]}>
                         <button className={styles["remove-button"]} id= "remove-button"><img src={removeIcon}/></button>
                         <button className={styles["edit-button"]} id= "edit-button"><img src={editIcon}/></button>
                      </div>
                    </div>
              </div>}
             {item.category.toLocaleLowerCase() === "entertainment" &&<div key={`${index} ${item.category}`} className={styles["items-container"]}>
                    <div className={styles["left-info"]}>
                       <img src={entertainmentIcon} alt="Entertainment"/>
                       <ul >
                        <li className={styles["item-title"]}>{item.title}</li>
                        <li className={styles["item-date"]}>{formatDate(item.date)}</li>
                       </ul>
                    </div>
                    <div className={styles["right-info"]}>  
                      <p className={styles["item-price"]}>₹{item.price}</p>
                      <div className={styles["right-actions"]}>
                         <button className={styles["remove-button"]} id= "remove-button"><img src={removeIcon}/></button>
                         <button className={styles["edit-button"]} id= "edit-button"><img src={editIcon}/></button>
                      </div>
                    </div>
              </div>}
             {item.category.toLocaleLowerCase() === "travel"&&<div key={`${index} ${item.category}`} className={styles["items-container"]}>
                    <div className={styles["left-info"]}>
                       <img src={travelIcon} alt="Travel"/>
                       <ul >
                        <li className={styles["item-title"]}>{item.title}</li>
                        <li className={styles["item-date"]}>{formatDate(item.date)}</li>
                       </ul>
                    </div>
                    <div className={styles["right-info"]}>  
                      <p className={styles["item-price"]}>₹{item.price}</p>
                      <div className={styles["right-actions"]}>
                         <button className={styles["remove-button"]} id= "remove-button"><img src={removeIcon}/></button>
                         <button className={styles["edit-button"]} id= "edit-button"><img src={editIcon}/></button>
                      </div>
                    </div>
              </div>}
              {item.category.toLocaleLowerCase() === "shopping"&&<div key={`${index} ${item.category}`} className={styles["items-container"]}>
                    <div className={styles["left-info"]}>
                       <img src={travelIcon} alt="Shopping"/>
                       <ul >
                        <li className={styles["item-title"]}>{item.title}</li>
                        <li className={styles["item-date"]}>{formatDate(item.date)}</li>
                       </ul>
                    </div>
                    <div className={styles["right-info"]}>  
                      <p className={styles["item-price"]}>₹{item.price}</p>
                      <div className={styles["right-actions"]}>
                         <button className={styles["remove-button"]} id= "remove-button"><img src={removeIcon}/></button>
                         <button className={styles["edit-button"]} id= "edit-button"><img src={editIcon}/></button>
                      </div>
                    </div>
              </div>}
             </>)
          }  
          <div className={styles["page-navigation"]}>
              <button className={styles["left-button"]} id="left-navigate" onClick={handlePrevButton}><img src={leftArrow} alt="left" /></button>
              <button id = "current-page-button" className={styles["current-page-button"]}>{currentPage}</button>
              <button className={styles["right-button"]} id="right-navigate" onClick={handleNextButton}><img src={rightArrow} alt="right"/></button>
              </div>
         </Card>
      </div>
    )
}
const MemoizedTransactions = memo(Transactions)
export default MemoizedTransactions;