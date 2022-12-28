import {SelectionType, TodoListsStateType} from '../App';
import {v1} from 'uuid';


export type ActionsType =
  DeleteTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType


export type DeleteTodoListActionType = {
  type: 'DELETE-TODOLIST'
  id: string
}
export type AddTodoListActionType = {
  type: 'ADD-TODOLIST'
  title: string
}
export type ChangeTodoListTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type ChangeTodoListFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: SelectionType
}

export const todoListReducer = (state: Array<TodoListsStateType>, action: ActionsType): Array<TodoListsStateType> => {

  switch (action.type) {
    case 'DELETE-TODOLIST': {
      return state.filter(el => el.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [...state, {
        id: v1(),
        title: action.title,
        filterTask: 'All'
      }
      ]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const changeTitleTodo = state.find(tl => tl.id === action.id)
      if (changeTitleTodo) {
        changeTitleTodo.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todoList = state.find((tl) => tl.id === action.id)
      if (todoList) {
        todoList.filterTask = action.filter;
      }
      return [...state]
    }

    default:
      throw new Error('Спасите! Не знаю, что делать!')
  }
}
export const DeleteTodolistAC = (id: string): DeleteTodoListActionType => {
  return {type: 'DELETE-TODOLIST', id}
}
export const AddTodolistAC = (title: string): AddTodoListActionType => {
  return {type: 'ADD-TODOLIST', title}
}
export const ChangeTodolistTitleAC = (id:string,title: string): ChangeTodoListTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE',id, title}
}
export const ChangeTodolistFilterAC = (id:string,filter: SelectionType): ChangeTodoListFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER',id, filter}
}