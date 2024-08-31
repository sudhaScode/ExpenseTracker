import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    primary:{
      main:'#9785BA',
      light: '#F5F2FB',
      dark:'#AF9FCD',
      contrastText:'#FFFFFF',
    },
    secondary:{
      main: '#D7C7F4',
      light: '#FFFFFF',
      contrastText: '#000000',
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(0, 0, 0, 0.5)'
    },
    background: {
      default: '#D7C7F4', 
      paper: '#F9FAFA', 
    },
  },
  typography:{
    fontFamily: 'Ubuntu, Open Sans, sans-serif',
    h1:{
      fontFamily:'Ubuntu',
      fontSize:'2.5rem',
      'media (max-width: 600px)':{
        fontSize: '2rem'
      }
    },
    h2: {
      fontFamily: 'Ubuntu',
      fontSize: '1.5rem',
      fontWeight:"500"
    },
    h3: {
      fontFamily: 'Ubuntu',
      fontSize: '1.2rem',
      fontWeight:"400"
    },
    body1: {
      fontFamily: 'Open Sans',
      fontSize: '1rem',
    },
  },
  components:{
    MuiButton:{
      styleOverrides: {
        root: {
          background: '#D7C7F4',
          border:"none",
          color:'#000000',
          margin:"1rem",
        },
      },
    }
  },
  breakpoints: {
    values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
    },
},
})

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
)
