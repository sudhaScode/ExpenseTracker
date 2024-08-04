import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, } from 'recharts';
import "../cssmodules/PieCharts.css"




interface Expense{
    name: string
    value: number
  }
  interface ExpensesProps {
       data: Expense[] | undefined
  }


const PieCharts: React.FC<ExpensesProps>=({data})=>{
    const [totalExpenses, setTotalExpenses] = useState<Expense[]>([])
    const COLORS = ["#9DFF5B", "#FF9304", "#A000FF", "#FDE006"];

    useEffect(()=>{
         if(data){
            setTotalExpenses(data)
         }
    },[data])

    return(
        <PieChart width={360} height={280}>
                <Pie
                    data={totalExpenses}
                    color="#000000"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    stroke="none" 
                >
                    {totalExpenses.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip/>
                <Legend verticalAlign='bottom'  height={36}/>
      </PieChart>
    )


}
export default PieCharts;