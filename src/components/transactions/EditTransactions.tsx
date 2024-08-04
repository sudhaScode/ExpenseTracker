import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "../UI/Modal";
import styles from "../cssmodules/Tracker.css.module.css";

interface item{
    title: string,
    date: Date,
    category: string,
    price: number
}
type expenseList = item[]

interface Porps{
    isOpen: boolean, 
    modalHander: ()=>void
    item:item
}

const EditTransaction: React.FC<Porps> =({isOpen, item, modalHander})=>{


  const expenseFormik = useFormik({
    initialValues: {
      title: item.title || "",
      price: item.price || 0,
      category: item.category || "",
      date: item.date || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Expense Name missing"),
      price: Yup.number().positive().required("Enter valid Cost of Expense"),
      category: Yup.string().required("Select atleast one category"),
      date: Yup.date().required("Choose date of expense"),
    }),
    onSubmit: (formData) => {
      // console.log(formData);
      //Update wallet
      const storedWallet = localStorage.getItem("walletBalance")
      if(storedWallet){
        const parsedStoredWallet = JSON.parse(storedWallet)
        const walletBalance = {
          balance: parsedStoredWallet.balance + item.price - formData.price ,
          expenses: parsedStoredWallet.expenses-item.price + formData.price
        }
        console.log("Updated ::: ", walletBalance);
        localStorage.setItem("walletBalance", `${JSON.stringify(walletBalance)}`)
      }
       //Update Expense list
      const obj = localStorage.getItem("expenseList")
      if(obj){
        const expenseList: expenseList = JSON.parse(obj)

        const updatedExpenses =  expenseList.filter(expense=> expense.title != item.title)
 
        updatedExpenses.push(formData)
       // console.log("::::::", expenseList, "::::::", obj, "::::::")
        localStorage.setItem("expenseList",`${JSON.stringify(updatedExpenses)}`)
      }
    //   else{
    //     const list =[]
    //     list.push(formData)
    //     localStorage.setItem("expenseList", `${JSON.stringify(list)}`)
    //   }
        modalHander()
    },
  });


    return (
        <Modal isOpened={isOpen} isFor={"edit-expense"}
          handler={modalHander}>
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
                        value={`${expenseFormik.values.date}`}
                        onChange={expenseFormik.handleChange}
                        onBlur={expenseFormik.handleBlur}
                      />
                      {expenseFormik.touched.date &&
                      expenseFormik.errors.date ? (
                        <p className={styles.error}>
                          {"Please Select a Date"}
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
                      onClick={()=>modalHander()}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
          </Modal>
    )
}


export default EditTransaction;