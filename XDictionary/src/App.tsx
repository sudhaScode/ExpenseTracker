import { SyntheticEvent, useState } from 'react'
import './App.css'

interface DictProps{
    word: string,
    meaning: string
}

const intialState: DictProps[] = [
  { word: "React", meaning: "A JavaScript library for building user interfaces." },
  { word: "Component", meaning: "A reusable building block in React." },
  { word: "State", meaning: "An object that stores data for a component." },
  { word: "Props", meaning: "Short for properties, these are read-only inputs passed to components." },
  { word: "JSX", meaning: "A syntax extension for JavaScript that looks similar to HTML, used with React to describe UI elements." },
  { word: "Hooks", meaning: "Functions that let you use state and other React features in functional components." },
  { word: "useEffect", meaning: "A hook that allows you to perform side effects in functional components, like data fetching or manual DOM manipulations." },
  { word: "Context API", meaning: "A way to pass data through the component tree without having to pass props down manually at every level." },
  { word: "Virtual DOM", meaning: "A lightweight copy of the actual DOM that React uses to optimize updates and rendering." },
  { word: "Lifecycle Methods", meaning: "Special methods in class components that run at different stages of a component's life, like mounting, updating, and unmounting." }
];

interface StateProps{
  result: string,
  dictionary: DictProps[]
}
 

function App() {

  const [dictionary, setDictionary] = useState<StateProps>({result:"",dictionary:intialState})
  const submitHandler =(event: SyntheticEvent)=>{
    event.preventDefault()
      const lowerCaseInput = (event.target.input.value).toLocaleLowerCase()
      
      const output:DictProps[] =  dictionary?.dictionary.filter(((word)=>(word.word).toLocaleLowerCase() === lowerCaseInput))
      if(output.length){
        setDictionary(prev=>({...prev, result:output[0].meaning}))
      }
      else{
        setDictionary(prev=>({...prev, result:"Word not found in the dictionary."}))
      }
  }
  return (
    <>
     <h1>Dictionary App</h1>
     <form onSubmit={submitHandler}>
        <input type='text' placeholder='Search for a word' required name="input"/>
        <button type='submit'>Search</button>
     </form>
     <h5>
       Definition:
     </h5>
     <p>{dictionary.result}</p>
      
    </>
  )
}

export default App
