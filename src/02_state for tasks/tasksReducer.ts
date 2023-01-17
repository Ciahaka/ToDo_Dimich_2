import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType, DeleteTodoListActionType} from '../01_state for todolist/todolistReducer';


export type ActionsType =
  deleteTaskACType
  | addTaskACType
  | changeTaskStatusType
  | changeTaskTitleACType
  | AddTodoListActionType
  | DeleteTodoListActionType

export type deleteTaskACType = {
  type: 'DELETE-TASK'
  taskID: string
  todoListID: string
}
export type addTaskACType = {
  type: 'ADD-TASK'
  title: string
  todoListID: string
}
export type changeTaskStatusType = {
  type: 'CHANGE-TASK-STATUS'
  taskID: string
  isDone: boolean
  todoListID: string
}
export type changeTaskTitleACType = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  title: string
  todoListID: string
}


export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {

  switch (action.type) {
    case 'DELETE-TASK': {
      const stateCopy = {...state}
      const tasks = state[action.todoListID]
      const filteredTask = tasks.filter(el => el.id !== action.taskID)
      stateCopy[action.todoListID] = filteredTask
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todoListID]
      const newTask = {id: v1(), title: action.title, isDone: false}
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todoListID] = newTasks
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todoListID]
      const task = tasks.find((el) => el.id === action.taskID)
      if (task) {
        task.isDone = action.isDone
        stateCopy[action.todoListID] = tasks
      }
      return stateCopy
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todoListID]
      const task = tasks.find((el) => el.id === action.taskID)
      if (task) {
        task.title = action.title
        stateCopy[action.todoListID] = tasks
      }
      return stateCopy
    }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = []
      return stateCopy
    }
    case 'DELETE-TODOLIST':{
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    }

    default:
      throw new Error('Спасите! Не знаю, что делать!')
  }
}
export const deleteTaskAC = (taskID: string, todoListID: string): deleteTaskACType => {
  return {type: 'DELETE-TASK', taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): addTaskACType => {
  return {type: 'ADD-TASK', title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusType => {
  return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): changeTaskTitleACType => {
  return {type: 'CHANGE-TASK-TITLE', taskID, title, todoListID}
}
