import { Box, Button, FormControl, TextField } from "@mui/material"
import { Todo } from "../model/Todo"
import { useRef } from "react"
import { red } from "@mui/material/colors";

type Props = {
  allTodosList: Todo[];
  setAllTodosList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskInput: React.FC<Props> = ({allTodosList, setAllTodosList}) => {
  

  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault();
    const todoDetail = todoInputRef.current?.value || "";
    if (!todoDetail) {
      todoInputRef.current?.focus();
      return;
    }
    
    const newTodo = {
      id: Date.now(),
      detail: todoDetail,
      isCompleted: false,
    }

    setAllTodosList([...allTodosList, newTodo]);
    if(todoInputRef.current) {
      todoInputRef.current.value = "";
    }
    todoInputRef.current?.focus();
  }

  return (
    <form style={{width: '100%'}} onSubmit={handleSubmit}>

      <Box sx={{display: "flex", flexDirection: {
        xs: "column",
        md: "row"
      }, justifyContent: "center", gap: 4, bgcolor: '', width: 1}}>
        <FormControl sx={{width: 1}}>
          <TextField inputRef={todoInputRef} sx={{width: 1, ".css-q1n6jr-MuiInputBase-root-MuiFilledInput-root::after" : {
            borderBottom: '2px solid green'
          }}} variant="filled" type="text"  />
        </FormControl>
        <Button color="primary"  type="submit" sx={{textWrap: "nowrap", px: 10, py: 2, fontSize: "1rem"}} variant="contained"> Add Task</Button>
      </Box>
    </form>
  )
}

export default TaskInput
