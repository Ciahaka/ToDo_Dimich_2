import {v1} from 'uuid';
import {TaskPropsType} from '../component/Todolist';
import {TaskStateType} from '../App';


export type ActionsType = Action_1Type | Action_2Type

export type Action_1Type = {
  type: '1'
  id: string
}
export type Action_2Type = {
  type: '2'
  title: string
}


export const tasksReducer = (state: Array<TaskStateType>, action: ActionsType): Array<TaskStateType> => {

  switch (action.type) {
    case '1': {
      return {...state}
    }
    case '2': {
      return {...state}
    }


    default:
      throw new Error('Спасите! Не знаю, что делать!')
  }
}
export const AC_1 = (id: string): Action_1Type => {
  return {type: '1', id}
}
export const AC_2 = (id: string): Action_2Type => {
  return {type: '2', id}
}