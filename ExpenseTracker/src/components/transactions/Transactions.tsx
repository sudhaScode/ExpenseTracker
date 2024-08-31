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
import EditTransaction from "./EditTransactions";

interface Transaction{
    title: string;
    date: Date;
    category: string;
    price: number;
} 
type ExpenseList = Transaction[]
interface TransactionList{
  expenses: Transaction[]
  hadChange:()=>void
}

interface ModalObj{
  isOpen: boolean, 
  item:{
  title: string,
  date: Date,
  category: string,
  price: number
}}

const Transactions: React.FC<TransactionList>= ({expenses, hadChange})=>{
  // const [expenseList, setExpenseList] = useState<ExpenseList>([])
  const [pages, setPages] = useState<number[]>([])
  const [currentItems, setCurrentItems] = useState<ExpenseList>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<ModalObj>({isOpen:false, item:{title: "",
    date: new Date(),
    category: "",
    price: 0}});

const maxPages =3



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
  const removeHandler=(item : Transaction)=>{
      const updatedExpenses =  expenses.filter(expense=> expense.title != item.title)
      // console.log("Update it :: ",updatedExpenses)
      localStorage.setItem("expenseList", `${JSON.stringify(updatedExpenses)}`)


      const storedWallet = localStorage.getItem("walletBalance")
      if(storedWallet){
        const parsedStoredWallet = JSON.parse(storedWallet)
        const walletBalance = {
          balance: parsedStoredWallet.balance + item.price,
          expenses: parsedStoredWallet.expenses-item.price
        }
        // console.log("Updated ::: ", walletBalance);
        localStorage.setItem("walletBalance", `${JSON.stringify(walletBalance)}`)
      }
      hadChange()
  }
  const editHandler=(item: Transaction)=>{
    // console.log(isModalOpen, ":::track")
    setIsModalOpen({isOpen:true, item:{
      title: item.title,
      date: item.date,//new Date(item.date)
      category: item.category,
      price: item.price}})
    // hadChange()      
  }
  const modalHander=()=>{
   
    setIsModalOpen({isOpen:false, item:{title: "",
      date: new Date(),
      category: "",
      price: 0}})

      hadChange()
  }

  useEffect(()=>{
    const length = expenses.length;

    // three times for page
    const pagesRequired = Math.ceil(length/maxPages )
    // console.log("DEBUG", pagesRequired)
     const list =  new Array(pagesRequired).fill(0).map((_,i)=>i+1)
    //  console.log("Required Pages:: ", list)
     setPages(list)
  },[expenses])

  useEffect(()=>{
    if(currentPage ===1){
      const items = expenses.slice(currentPage-1, currentPage*maxPages );
      setCurrentItems(items)
    }
    else{
      const items = expenses.slice(currentPage+1, currentPage*maxPages );
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
             currentItems && currentItems.map((item,index)=><div key={`${index} ${item.title}`}>
             {item.category.toLocaleLowerCase() === "food" &&<div  className={styles["items-container"]}>
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
                         <button className={styles["remove-button"]} id= "remove-button" onClick={()=>removeHandler(item)}><img src={removeIcon}/></button>
                         <button className={styles["edit-button"]} id= "edit-button"><img src={editIcon} onClick={()=>editHandler(item)}/></button>
                      </div>
                    </div>
              </div>}
             {item.category.toLocaleLowerCase() === "entertainment" &&<div  className={styles["items-container"]}>
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
                         <button className={styles["remove-button"]} id= "remove-button" onClick={()=>removeHandler(item)}><img src={removeIcon}/></button>
                         <button className={styles["edit-button"]} id= "edit-button" onClick={()=>editHandler(item)}><img src={editIcon}/></button>
                      </div>
                    </div>
              </div>}
             {item.category.toLocaleLowerCase() === "travel"&&<div  className={styles["items-container"]}>
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
                         <button className={styles["remove-button"]} id= "remove-button" onClick={()=>removeHandler(item)} ><img src={removeIcon}/></button>
                         <button className={styles["edit-button"]} id= "edit-button" onClick={()=>editHandler(item)}><img src={editIcon}/></button>
                      </div>
                    </div>
              </div>}
              {item.category.toLocaleLowerCase() === "shopping"&&<div  className={styles["items-container"]}>
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
                         <button className={styles["remove-button"]} id= "remove-button" onClick={()=>removeHandler(item)}><img src={removeIcon}/></button>
                         <button className={styles["edit-button"]} id= "edit-button" onClick={()=>editHandler(item)}><img src={editIcon}/></button>
                      </div>
                    </div>
              </div>}
             </div>)
          }  
         {pages.length > 1 &&
          <div className={styles["page-navigation"]}>
          <button className={styles["left-button"]} id="left-navigate" onClick={handlePrevButton}><img src={leftArrow} alt="left" /></button>
          <button id = "current-page-button" className={styles["current-page-button"]}>{currentPage}</button>
          <button className={styles["right-button"]} id="right-navigate" onClick={handleNextButton}><img src={rightArrow} alt="right"/></button>
      </div>}
         </Card>
         {isModalOpen.isOpen && <EditTransaction isOpen={isModalOpen.isOpen} item={isModalOpen.item} modalHander={modalHander}/>}
      </div>
    )
}
const MemoizedTransactions = memo(Transactions)
export default MemoizedTransactions;