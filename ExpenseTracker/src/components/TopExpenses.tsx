import Card from "./UI/Card";
import styles from "./cssmodules/TopExpenses.module.css"
import BarChartComponent from "./BarGraph";


interface Props{
    onChange: boolean
}
const TopExpenses: React.FC<Props>=({onChange})=>{

    return(
        <div>
        <h2 className={styles.subtitle}>Top Expenses</h2>
         <Card className={styles.container}>
            <BarChartComponent onChange= {onChange}/>
         </Card>
      </div>
        
    );
}

export default TopExpenses;