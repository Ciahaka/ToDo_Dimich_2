
import {TodoListsStateType} from '../App';


export type ActionType = {
  type: string
  [key: string]: any
}

export const todoListReducer = (state: Array<TodoListsStateType>, action: ActionType): Array<TodoListsStateType> => {

  switch (action.type) {
    case 'DELETE-TODOLIST':{
      return state.filter(el => el.id !== action.id)
  }
    default:
      throw new Error('Спасите! Не знаю, что делать!')
  }
}