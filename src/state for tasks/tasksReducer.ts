
import {TaskStateType} from '../App';


export type ActionsType = Action_1Type | Action_2Type

export type Action_1Type = {
  type: '1'
  id: string
  title:string
  isDone:boolean
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
export const actionAC_1 = (id: string): Action_1Type => {
  return {type: '1', id, title:'111', isDone:true}
}
export const actionAC_2 = (id: string, title:string): Action_2Type => {
  return {type: '2', title}
}