import {TaskStateType, TodoListsStateType} from '../App';
import {addTodolistAC, todoListReducer} from '../01_state for todolist/todolistReducer';
import {tasksReducer} from '../02_state for tasks/tasksReducer';

test('ids should be equals', () => {
  const startTasksState: TaskStateType = {}
  const startTodolistsState: Array<TodoListsStateType> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})
