import { Box } from '@mui/material'
import Tasks from './Tasks'
import { teal } from '@mui/material/colors'
import { Todo } from '../model/Todo'
import { TaskState } from '../model/TaskState'
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

type Props = {
  allTodosList: Todo[];
  setAllTodosList: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const TodoList: React.FC<Props> = ({allTodosList, setAllTodosList}) => {
  
  function handleOnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
  
    if (!over) return;
  
    const todoId = active.id as number;
    const newStatus = over.id as unknown as TaskState;
  
    setAllTodosList(() =>
      allTodosList.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              isCompleted: newStatus === TaskState.COMPLETED ? true : false
            }
          : todo
      )
    );
  }


  const sensor = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  )


  return (
    <Box sx={
      {
        bgcolor:teal[400],
        width:1,
        py: 4,
        px: 4,
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        justifyContent: 'center',
        alignItems: 'start',
        borderRadius: 2,
        gap: 4,
        boxSizing: 'border-box'
      }}>
        <DndContext sensors={sensor} onDragEnd={handleOnDragEnd}>
          <Tasks allTodosList={allTodosList} setAllTodosList={setAllTodosList} taskState={TaskState.REMAINING} />
          <Tasks allTodosList={allTodosList} setAllTodosList={setAllTodosList} taskState={TaskState.COMPLETED} />
        </DndContext>
    </Box>
  )
}

export default TodoList
