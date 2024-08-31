
import * as React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className: string;
}
const Card: React.FC<CardProps>=({children, className})=>{
    
    return (
        <div className={className? className:""}>
            {children}
        </div>
    );
}

// Card.defaultProps = {
//     className: '',
//   };
  
//   Card.propTypes = {

//     className: PropTypes.string,
//     children: PropTypes.node,
//   };

export default Card;