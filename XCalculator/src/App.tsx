import React, { useCallback, useState } from "react";



function App() {
  const [expression, setExpression] = useState("")
  const [total, setTotal] = useState("")
  const [isItShow, setIsItShow ] = useState(false)
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3];
  const operations = ["+", "-", "*", "/"]

  const clickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    
 
    setIsItShow(false)
    setTotal("")
    const buttonName = event.currentTarget.name;
    if(operations.includes(expression[expression.length-1]) && operations.includes(buttonName)){
      return 
    }
    setExpression(prev=>prev+buttonName)
  };
  const clickResetHandler=()=>{
    setIsItShow(false)
    setTotal("")
    setExpression("")
  }
  const clickOperation= useCallback(()=>{
    setIsItShow(true)
    const operations = ["+", "-", "*", "/"]
    if(!expression.length || operations.includes(expression[expression.length-1])){
      setTotal("Error")
      return
    }
    const numInput = expression.split(/[+\-*/]/)
    const stack = expression.match(/[-+*/]/g)
    // if(numInput.length <=1){
    //   setTotal("Error")
    //   return
    // }
  console.log(stack, numInput)
    const result = numInput.reduce((accumulator, currentValue) => {
      const operator = stack?.shift();
      const temp = Number(currentValue);
      //  console.log("accumulator::" , accumulator,"currentValue::", currentValue)
      if (operator === '+') {
        return Number(accumulator) + temp;
      } else if (operator === '-') {
        return Number(accumulator) - temp;
      } else if (operator === '*') {
        return Number(accumulator) * temp;
      } else {  
        return Number(accumulator) / temp;
      }
    }, Number(numInput.shift()));
    
    const str= String(result)
    setTotal(str)
},[expression])
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center">
        <h1 className='text-black text-3xl font-bold mt-10 text-3xl'>React Calculator</h1>
        <input type="text"  value ={expression} className=" border-black border-2 rounded h-30 w-33 mb-3 mt-5 p-2 text-lg" readOnly/>
        {isItShow &&  <p className="pt-1 rounded font-bold bg-green-100 h-8 min-w-20 m-3 text-center">{total}</p>}
        <div className="flex">
          {/**For Numbers */}
          <div className="flex gap-3 w-228 flex-wrap">
          {numbers.map((item,index)=><button onClick={(event)=>clickHandler(event)} name={`${item}`}  key={index} className={typeof item === "number" ? "hover:bg-green-200 w-16 h-12 border-black border-2 rounded text-3xl":"hover:bg-red-500 w-16 h-12 border-black border-2 rounded text-3xl" } >{item}</button>)}
          <button onClick={clickResetHandler} name={`C`}  key={"clear"} className=" hover:bg-green-700 w-16 h-12 border-black border-2 rounded text-3xl">C</button>
          <button onClick={(event)=>clickHandler(event)} name={`0`}  key={"zero"} className=" hover:bg-green-700 w-16 h-12 border-black border-2 rounded text-3xl">0</button>
          <button onClick={clickOperation} name={`=`}  key={"operate"} className=" hover:bg-green-700 w-16 h-12 border-black border-2 rounded text-3xl">=</button>
          </div>
          <div className="flex flex-col gap-3" >
          {operations.map((item,index)=><button onClick={(event)=>clickHandler(event)} name={`${item}`}  key={index} className=" hover:bg-green-700 w-16 h-12 border-black border-2 rounded text-3xl">{item}</button>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
