import { Box, ThemeProvider } from '@mui/material'
import './App.css'
import TodoMainContent from './component/TodoMainContent'
import { Theme } from './Theme'

function App() {

  return (
    <>
      <Box>
        <ThemeProvider theme={Theme}>
          <TodoMainContent />
        </ThemeProvider>
      </Box>
    </>
  )
}

export default App
