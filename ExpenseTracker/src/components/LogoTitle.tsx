import React from "react";
import styles from "./cssmodules/LogoTracker.module.css"

const  LogoTitle: React.FC<{title:string}>= ({title})=>{

    return (
        <div className={styles.tilte}>
           {title}
        </div>
    );
    
}

export default LogoTitle

