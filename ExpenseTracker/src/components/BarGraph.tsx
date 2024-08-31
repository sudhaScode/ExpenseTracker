import { BarChart, Bar, XAxis, YAxis, CartesianGrid, /*Tooltip,*/  } from 'recharts';
import "./cssmodules/BarGraph.css"
import { useEffect , useState} from 'react';


interface Expense{
    name: string
    value: number
  }
type Expenses= Expense[]

  interface Props{
    onChange: boolean
}
const BarChartComponent:React.FC<Props> = ({onChange}) => {
    const [chartData, setChartData] = useState<Expenses>()
  

useEffect(()=>{
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
        const constrcutData:Expenses = [
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
        constrcutData.sort((item1, item2)=> item2.value -item1.value)
        setChartData(constrcutData)
    }
    

},[onChange])
  return (
    <BarChart width={400} height={400} data={chartData} layout='vertical' margin={{left:60}}>
      <CartesianGrid stroke='none'  />
      <XAxis type="number" display="none" axisLine={false} tickLine={false}/>
      <YAxis  dataKey="name" type="category" axisLine={false} tickLine={false}/>
      {/* <Tooltip/> */}
      <Bar dataKey="value" fill="#8884d8"  barSize={22} radius={[0,10,10,0]} ></Bar>
    </BarChart>
  );
};

export default BarChartComponent;
