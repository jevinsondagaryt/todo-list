import { Box,  Paper,  TextField,  Typography } from '@mui/material'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from '../model/Todo';
import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

type Props = {
  allTodosList: Todo[];
  setAllTodosList: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoDeatils: Todo;
}
const TodoCard: React.FC<Props> = ({todoDeatils, allTodosList, setAllTodosList}) => {

  function handleDelete (id: number) : void {
    const updatedList = allTodosList?.filter(todo => todo.id !== id)
    setAllTodosList(updatedList);
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const todoDetailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todoDetailInputRef.current?.focus();
    if (todoDetailInputRef.current) {
      todoDetailInputRef.current.value = todoDeatils.detail;
      console.log(todoDetailInputRef.current);
    }
  }, [isEditing])
  

  function handleSubmit(id: number, e: React.FormEvent) : void {
    e.preventDefault();
    const newTodoDetail = todoDetailInputRef.current?.value;
    if (newTodoDetail) {
      const updatedList = allTodosList?.map(todo => todo.id == id ? {...todo, detail: newTodoDetail} : todo);
      setAllTodosList(updatedList);
    }
    setIsEditing(false);
  }

  const {setNodeRef, listeners, attributes, transform, isDragging} = useDraggable({
    id: todoDeatils.id,
  })
  
  return (
    <Paper elevation={isDragging ? 20 : 4} ref={setNodeRef} {...listeners} {...attributes} onMouseDown={(e) => console.log('draging')}
      sx={{ 
        bgcolor: "lightcyan",
        boxSizing: 'border-box',
        width: '100%',
        px: 3,
        mt: 1,
        py: 2,
        borderRadius: 2,
        display: 'flex',
        columnGap: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        transform:  `${transform ? `translate(${transform.x}px, ${transform.y}px)` : ''}`,
        cursor: isDragging ? 'grabbing' : 'grab',
        // outline: 'none  ',
        touchAction: 'none'

      }}>

      {
        isEditing 
        ?
        <form onSubmit={(e) => handleSubmit(todoDeatils.id, e)} >
          <TextField onKeyDown={(e)=> {
                e.currentTarget.focus();
                e.stopPropagation();
               }}
               
               onPointerDown={(e)=>{
                e.currentTarget.focus();
                e.stopPropagation();
               }}
              onMouseDown={(e) => {
                e.currentTarget.focus();
                console.log('clicked form');
                e.stopPropagation();
              }}  
          variant='filled' sx={{p: 0, boxSizing: 'border-box',}} slotProps={{htmlInput: {style: {padding: 1}}}} type='text' inputRef={todoDetailInputRef} />
        </form>
        : <Typography onKeyDown={(e)=>{
          e.stopPropagation();
        }}
        onPointerDown={(e)=>{
           e.stopPropagation();
        }}  onMouseDown={(e) => {
          e.stopPropagation();
        }} sx={
          {
            textDecoration: `${todoDeatils.isCompleted ? 'line-through': ''}`,
            overflow: 'hidden',
            whiteSpace: 'normal',
            textOverflow: 'ellipsis',
            cursor: 'text',
            maxWidth: 210,
          }} >{todoDeatils.detail}</Typography>

      }
      <Box onKeyDown={(e)=>{
            e.stopPropagation();
          }}
          onPointerDown={(e)=>{
             e.stopPropagation();
          }} 
       sx={{display: 'flex', columnGap: 2}}  >
        {
          !todoDeatils.isCompleted && 
          <FaEdit onMouseDown={(e) => { console.log('onMouseDown');
           setIsEditing(!isEditing);} }
            style={{cursor: 'pointer'}} size={20} />
        }
        <MdDelete  onMouseDown={(e) => { handleDelete(todoDeatils.id);} } style={{cursor: 'pointer'}}
        size={20} />
      </Box>
    </Paper>
  )
}

export default TodoCard
