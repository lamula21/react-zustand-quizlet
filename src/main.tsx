import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseLine from '@mui/material/CssBaseline'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={darkTheme}>
		<CssBaseLine />
		<App />
	</ThemeProvider>
)
