
import { FormEvent, useState } from 'react'
import './App.css'
import Modal from './Modal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const submitHandler=(event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const phoneNumber = event.target.phone.value;
    const dob = new Date(event.target.dob.value)
    const todayDate = new Date()   
    if(phoneNumber.length !== 10){
      alert("Invalid phone number. Please enter a 10-digit phone number.")
      return
    }
    else if(dob>=todayDate){
      alert("Invalid date of birth. Date of birth cannot be in future.")
      return
    }
    setIsModalOpen(false)

  }

  return (
    <div className='App'>
     <h1>User Details Modal</h1>
     <button onClick={()=>setIsModalOpen(true)}>Open Form</button>
    {
      isModalOpen &&<>
      <Modal onClose={()=>setIsModalOpen(false)}>
      <form onSubmit={(event)=>submitHandler(event)}>
            <h3>Form Details</h3>
            <label htmlFor="username">Username:</label >
            <input required name = "username" id ="username" type='text'></input>
            <label htmlFor='email'>Email Address:</label >
            <input required name = "email" id ="email" type='email'></input>
            <label htmlFor='phone'>Phone Number:</label>
            <input required name = "phone" id ="phone" type='number'></input>
            <label htmlFor='dob'>Date of Birth:</label>
            <input required name = "dob" id ="dob" type='date'></input>
            <button id ="submit-button" type='submit' className='submit-button'>Submit</button>
          </form>
      </Modal>
      </>
    }
    </div>
  )
}

export default App
