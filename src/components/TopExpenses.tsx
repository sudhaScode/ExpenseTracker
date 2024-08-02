import Card from "./UI/Card";
import styles from "./cssmodules/TopExpenses.module.css"

const TopExpenses: React.FC=()=>{

    return(
        <div>
        <h2 className={styles.subtitle}>Top Expenses</h2>
         <Card className={styles.container}>
      
         </Card>
      </div>
        
    );
}

export default TopExpenses;