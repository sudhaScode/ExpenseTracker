import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import styled from '@emotion/styled';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'black',
    },
    '& .MuiRating-iconHover': {
      color: '#AF9FCD',
    },
  });
  
  interface Props{
    val: number
    onSet: (value:number)=>void
    isReadOnly: boolean
  }
const ResponseRating:React.FC<Props> = ({onSet, val, isReadOnly})=> {
  const [value, setValue] = React.useState<number | null>(val);
  const [hover, setHover] = React.useState(-1);
  const onChangeHandler =(newValue:number)=>{
    if(!isReadOnly){
      setValue(newValue);
      onSet(newValue || 0)
    }
  }
  const onChangeActiveHandler =(newHover:number)=>{
    if(!isReadOnly){
      setHover(newHover);
    }
    
  }

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <StyledRating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(_event, newValue)=>{onChangeHandler(newValue || 0)}}
        onChangeActive={(_event, newHover) => {
           onChangeActiveHandler(newHover)
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        size='small'
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

export default ResponseRating;