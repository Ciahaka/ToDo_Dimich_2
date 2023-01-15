import {TaskStateType} from '../App';


export type ActionsType = deleteTaskAC | Action_2Type

export type deleteTaskAC = {
  type: 'DELETE-TASK'
  taskID: string
  todoListID: string
}
export type Action_2Type = {
  type: '2'
  title: string
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
    case '2': {
      return {...state}
    }


    default:
      throw new Error('Спасите! Не знаю, что делать!')
  }
}
export const deleteTaskAC = (taskID: string, todoListID: string): deleteTaskAC => {
  return {type: 'DELETE-TASK', taskID, todoListID}
}
export const actionAC_2 = (id: string, title: string): Action_2Type => {
  return {type: '2', title}
}