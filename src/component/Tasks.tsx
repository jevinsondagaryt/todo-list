import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import TodoCard from './TodoCard'
import { Todo } from '../model/Todo';
import { blue, lightGreen, red } from '@mui/material/colors';
import { TaskState } from '../model/TaskState';
import { useDroppable } from '@dnd-kit/core';

type Props = {
  allTodosList: Todo[];
  setAllTodosList: React.Dispatch<React.SetStateAction<Todo[]>>;
  taskState: TaskState
}
const Tasks: React.FC<Props> = ({allTodosList, setAllTodosList, taskState}) => {
  
  const remainingTasks = allTodosList?.map(todo => !todo?.isCompleted ? <TodoCard key={todo.id} todoDeatils={todo} allTodosList={allTodosList} setAllTodosList={setAllTodosList} /> : null)
  const completedTask = allTodosList?.map(todo => todo?.isCompleted ? <TodoCard key={todo.id} todoDeatils={todo} allTodosList={allTodosList} setAllTodosList={setAllTodosList} /> : null)

  const {setNodeRef} = useDroppable({
    id: taskState
  })

  return (
    <Paper ref={setNodeRef} elevation={10}  sx={
      {
        bgcolor: `${taskState === TaskState.REMAINING ? red[200] : lightGreen[400]}`,
        width:1,
        py: 2,
        px: 2,
        boxSizing: 'border-box',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        rowGap: 2        
      }}>
      <Typography sx={{textTransform: 'uppercase', fontSize: "1rem"}}> { taskState === TaskState.COMPLETED ? 'Completed task' : 'Remaining tasks'}</Typography> 
      <Box sx={{width: 1}} >        
        { taskState === TaskState.COMPLETED ? completedTask : remainingTasks}
      </Box>
    </Paper>
  )
}

export default Tasks