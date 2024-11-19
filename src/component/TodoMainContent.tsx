import { Container } from '@mui/material'
import TaskInput from './TaskInput'
import TodoList from './TodoList'
import { useState } from 'react'
import { Todo } from '../model/Todo'


  const TodoMainContent = () => {
    const [allTodosList, setAllTodosList] = useState<Todo[]>([{id: 1, detail: 'Its Done!', isCompleted: true}]);
    
    return (
      <Container sx={{bgcolor: "lightblue", height: "100vh", py: "4rem", 
        px: {
          xs: "2rem !important",
          sm: "5rem !important",
          lg: "10rem !important"
        }, display: 'flex', justifyContent: 'top',
        alignItems:'center', flexDirection: 'column', rowGap: 4}} >
        <TaskInput allTodosList={allTodosList} setAllTodosList={setAllTodosList} />
        <TodoList allTodosList={allTodosList} setAllTodosList={setAllTodosList} />
      </Container>
    )
  }

  export default TodoMainContent
