import { useEffect, useState } from "react";
import styles from "../cssmodules/Tracker.css.module.css";
import "../cssmodules/Modal.css";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";

import PieCharts from "./PieCharts";

interface Wallet {
  balance: number;
  expenses: number;
}
interface ModalConstraints {
  isOpened: boolean;
  for: string;
}

interface Props {
  hadChange: ()=>void;
  storedWallet: Wallet
}

interface Expense{
  name: string
  value: number
}
type Expenses= Expense[]
const Tracker: React.FC<Props> = ({hadChange, storedWallet}) => {

  const [wallet, setWallet] = useState<Wallet>({
    balance: 0,
    expenses: 0,
  });
  const [chartData, setChartData] = useState<Expenses>()

  const [isModalOpened, setModalOpened] = useState<ModalConstraints>({
    isOpened: false,
    for: "none",
  });
  const balanceFormik = useFormik({
    initialValues: {
      income: wallet.balance || 0,
    },
    validationSchema: Yup.object({
      income: Yup.number().positive().required("Enter New Income"),
    }),
    onSubmit: (formData) => {
      setModalOpened({isOpened: false,for: "none"})
      
        const wallet = localStorage.getItem("walletBalance")
        if(wallet){
          const parsedWallet = JSON.parse(wallet)
          const newIncome = Number(formData.income) - Number(parsedWallet.expenses);
          const newWallet = {
            balance: newIncome,
            expenses: parsedWallet.expenses
          }
          localStorage.setItem("walletBalance",`${JSON.stringify(newWallet)}`)    
        }
      hadChange()
    },
  });
  const expenseFormik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      category: "",
      date: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Expense Name missing"),
      price: Yup.number().positive().required("Enter valid Cost of Expense"),
      category: Yup.string().required("Select atleast one category"),
      date: Yup.date().required("Choose date of expense"),
    }),
    onSubmit: (formData) => {
      // console.log(formData);
      const storedWallet = localStorage.getItem("walletBalance")
      if(storedWallet){
        const walletBalance = {
          balance: wallet.balance - formData.price,
          expenses: wallet.expenses + formData.price
        }
        localStorage.setItem("walletBalance", `${JSON.stringify(walletBalance)}`)
      }

      const obj = localStorage.getItem("expenseList")
      if(obj){
        const expenseList = JSON.parse(obj)
        expenseList.push(formData)
       // console.log("::::::", expenseList, "::::::", obj, "::::::")
        localStorage.setItem("expenseList",`${JSON.stringify(expenseList)}`)
      }
      else{
        const list =[]
        list.push(formData)
        localStorage.setItem("expenseList", `${JSON.stringify(list)}`)
      }

      setModalOpened({isOpened: false,for: "none"})
      hadChange()
    },
  });

  // const balance: balanceType={
  //   walletBalance: Number(localStorage.getItem("walletBalance")),
  //    expenses: Number(localStorage.getItem("expenses"))
  // }

  const modalHander = (state: boolean) => {
    // console.log(event)
    setModalOpened((prev) => ({ isOpened: state, for: prev.for }));
  };
  const addHander = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name === "add-balance") {
      setModalOpened({ isOpened: true, for: "add-balance" });
    } else {
      setModalOpened({ isOpened: true, for: "add-expense" });
    }
    // modalHander(true)
  };

  /**
   * 
   * Preapare Data for Pie CHART
   * create expense object with sum of category expenses and total expenses
   */


  useEffect(() => {
    setWallet(storedWallet);
    const storedExpenses = localStorage.getItem("expenseList")
      if(storedExpenses){
        type Item ={
          title: string;
          date: Date;
          category: string;
          price: number;
        }
        type Items = Item[]
         const storedData:Items = JSON.parse(storedExpenses)
         const temp = {
          shopping: 0,
          food: 0,
          entertainment:0,
          travel: 0
        }
        storedData.forEach((item)=>{


            if(item.category.toLowerCase() === "food" ){
               temp.food += item.price
            }
            else if (item.category.toLowerCase() === "shopping" ){
                     temp.shopping += item.price
            }
            else if (item.category.toLowerCase() === "entertainment" ){
              temp.entertainment += item.price
            }
            else{
              temp.travel += item.price
            }
        })
        const constrcutData = [
          {
            name: "Shopping",
            value: temp.shopping
          },
          {
            name: "Entertainement",
            value: temp.entertainment
          },
          {
            name: "Food",
            value: temp.food
          },
          {
            name: "Travel",
            value: temp.travel
          }
        ]
        setChartData(constrcutData)
      }

  }, [storedWallet]);
  useEffect(() => {
    if (!isModalOpened.isOpened) {

      const wallet = localStorage.getItem("walletBalance")
      if(wallet){
         const walletBalance = JSON.parse(wallet)
         setWallet(walletBalance);
      }
   
    }
  }, [isModalOpened]);

  return (
    <>
      <Card className={styles.tracker}>
        <div className={styles.container}>
          <div className={styles["sub-container"]}>
            <Card className={styles.balance}>
              <h1 className={styles.wallet}>
                Wallet Balance: <span>₹{wallet.balance}</span>
              </h1>
              <button
                className={styles["wallet-button"]}
                name="add-balance"
                onClick={(event) => addHander(event)}
              >
                + Add Income
              </button>
            </Card>
            <Card className={styles.balance}>
              <h1 className={styles.expense}>
                Expenses: <span>₹{wallet.expenses}</span>
              </h1>
              <button
                className={styles["expense-button"]}
                name="add-expense"
                id="add-expense"
                onClick={(event) => addHander(event)}
              >
                + Add Expense
              </button>
            </Card>
          </div>
          <div className={styles.chart}>
            <PieCharts data={chartData}/>
          </div>
        </div>
      </Card>
      {isModalOpened.isOpened && (
        <Modal
          isOpened={isModalOpened.isOpened}
          isFor={isModalOpened.for}
          handler={modalHander}
        >
          <div>
            {isModalOpened.for === "add-expense" && (
              <>
                <h1 className="modal-title">Add Expenses</h1>
                <form
                  className="modal-form"
                  onSubmit={expenseFormik.handleSubmit}
                >
                  <div className="form-stage">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Title"
                        type="text"
                        id="title"
                        className="modal-input"
                        value={expenseFormik.values.title}
                        onChange={expenseFormik.handleChange}
                        onBlur={expenseFormik.handleBlur}
                      />
                      {expenseFormik.touched.title &&
                      expenseFormik.errors.title ? (
                        <p className={styles.error}>
                          {expenseFormik.errors.title}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Price"
                        type="number"
                        id="price"
                        className="modal-input"
                        value={expenseFormik.values.price}
                        onChange={expenseFormik.handleChange}
                        onBlur={expenseFormik.handleBlur}
                      />
                      {expenseFormik.touched.price &&
                      expenseFormik.errors.price ? (
                        <p className={styles.error}>
                          {expenseFormik.errors.price}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-stage">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Select Category"
                        type="text"
                        id="category"
                        className="modal-input"
                        value={expenseFormik.values.category}
                        onChange={expenseFormik.handleChange}
                        onBlur={expenseFormik.handleBlur}
                      />
                      {expenseFormik.touched.category &&
                      expenseFormik.errors.category ? (
                        <p className={styles.error}>
                          {expenseFormik.errors.category}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="date"
                        id="date"
                        className="modal-input"
                        value={expenseFormik.values.date}
                        onChange={expenseFormik.handleChange}
                        onBlur={expenseFormik.handleBlur}
                      />
                      {expenseFormik.touched.date &&
                      expenseFormik.errors.date ? (
                        <p className={styles.error}>
                          {expenseFormik.errors.date}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="form-stage">
                    <button
                      className={expenseFormik.isValid?"modal-submit":"modal-submit-error"}
                      disabled={!expenseFormik.isValid}
                      type="submit"
                      id="modal-add-expense"
                    >
                      Add Expense
                    </button>
                    <button
                      className="modal-cancel"
                      id="mpdal-cancel-expense"
                      onClick={() =>
                        setModalOpened({ isOpened: false, for: "none" })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
            {isModalOpened.for === "add-balance" && (
              <>
                <h1 className="modal-title">Add Balance</h1>
                <form
                  className="balance-modal-form"
                  onSubmit={balanceFormik.handleSubmit}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      placeholder="Income Amount"
                      type="number"
                      id="income"
                      className="balance-modal-input"
                      value={balanceFormik.values.income}
                      onChange={balanceFormik.handleChange}
                      onBlur={balanceFormik.handleBlur}
                    />
                    {balanceFormik.touched.income &&
                    balanceFormik.errors.income ? (
                      <p className={styles.error}>
                        {balanceFormik.errors.income}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="balance-form-stage">
                    <button
                      className={
                        balanceFormik.isValid
                          ? "balance-modal-submit"
                          : "balance-modal-submit-error"
                      }
                      id="modal-add-balance"
                      type="submit"
                      disabled={!balanceFormik.isValid}
                    >
                      Add Expense
                    </button>
                    <button
                      className="balance-modal-cancel"
                      id="modal-cancel-balance"
                      onClick={() =>
                        setModalOpened({ isOpened: false, for: "none" })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Tracker;

/**
<div>
                {isFor === "add-expense" &&
                   <>
                    <h1 className="modal-title">Add Expenses</h1> 
                       <form className='modal-form'>
                            <div className='form-stage'>
                                <input placeholder='Title' type='text' className='modal-input' />
                                <input placeholder='Price' type='number' className='modal-input'/>
                            </div>
                            <div className='form-stage'>
                                <input placeholder='Select Category' type='text' className='modal-input'/>
                                <input  type='date' className='modal-input'/>
                            </div>
                            <div className='form-stage'>
                                <button className='modal-submit'>Add Expense</button>
                                <button className='modal-cancel'>Cancel</button>
                            </div>
                       </form>
                   </>
                }
                 {isFor === "add-balance" &&
                   <>
                    <h1 className="modal-title">Add Balance</h1> 
                       <form className='balance-modal-form'>
                                <input placeholder='Income Amount' type='number' className='balance-modal-input'/>
                                <div className='balance-form-stage'>
                                    <button className='balance-modal-submit'>Add Expense</button>
                                    <button className='balance-modal-cancel'>Cancel</button>
                                </div>
                       </form>
                   </>
                }
                {isFor === "edit-expense" &&
                   <>
                    <h1 className="modal-title">Edit Expenses</h1> 
                       <form className='modal-form'>
                            <div className='form-stage'>
                                <input placeholder='Title' type='text' className='modal-input' />
                                <input placeholder='Price' type='number' className='modal-input'/>
                            </div>
                            <div className='form-stage'>
                                <input placeholder='Select Category' type='text' className='modal-input'/>
                                <input  type='date' className='modal-input'/>
                            </div>
                            <div className='form-stage'>
                                <button className='modal-submit'>Edit Expense</button>
                                <button className='modal-cancel'>Cancel</button>
                            </div>
                       </form>
                   </>
                }
              </div>
 */
