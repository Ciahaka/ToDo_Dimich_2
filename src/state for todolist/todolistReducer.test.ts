import {v1} from 'uuid';
import {SelectionType, TodoListsStateType} from '../App';
import {
  AddTodolistAC, ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  DeleteTodolistAC,
  todoListReducer
} from './todolistReducer';

test('Удалить один TodoList из state по id', () => {
  const todoListsId_1 = v1()
  const todoListsId_2 = v1()
  const startState: Array<TodoListsStateType> = [
    {id: todoListsId_1, title: 'What to learn', filterTask: 'All'},
    {id: todoListsId_2, title: 'What to buy', filterTask: 'All'},
  ]
  // const endState = todoListReducer(startState,{type: 'DELETE-TODOLIST', id:todoListsId_1})
  const endState = todoListReducer(startState, DeleteTodolistAC(todoListsId_1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListsId_2)
})

test('Добавить TodoList в стейт TodoList', () => {
  const todoListsId_1 = v1()
  const todoListsId_2 = v1()
  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodoListsStateType> = [
    {id: todoListsId_1, title: 'What to learn', filterTask: 'All'},
    {id: todoListsId_2, title: 'What to buy', filterTask: 'All'},
  ]
  // const endState = todoListReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})
  const endState = todoListReducer(startState, AddTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
  expect(endState[2].filterTask).toBe('All')
})

test('Измени заголовок TodoList по id', () => {
  const todoListsId_1 = v1()
  const todoListsId_2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodoListsStateType> = [
    {id: todoListsId_1, title: 'What to learn', filterTask: 'All'},
    {id: todoListsId_2, title: 'What to buy', filterTask: 'All'},
  ]

  // const action = {
  //   type: 'CHANGE-TODOLIST-TITLE' as const,
  //   id: todoListsId_2,
  //   title: newTodolistTitle
  // }
  // const endState = todoListReducer(startState, action)
  const endState = todoListReducer(startState, ChangeTodolistTitleAC(todoListsId_2, newTodolistTitle))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('Измени фильтр TodoList', () => {
  const todoListsId_1 = v1()
  const todoListsId_2 = v1()

  let newFilter: SelectionType = 'Completed'

  const startState: Array<TodoListsStateType> = [
    {id: todoListsId_1, title: 'What to learn', filterTask: 'All'},
    {id: todoListsId_2, title: 'What to buy', filterTask: 'All'},
  ]

  // const action: ChangeTodoListFilterActionType = {
  //   type: 'CHANGE-TODOLIST-FILTER',
  //   id: todoListsId_2,
  //   filter: newFilter
  // }

  const endState = todoListReducer(startState, ChangeTodolistFilterAC(todoListsId_2, newFilter))

  expect(endState[0].filterTask).toBe('All')
  expect(endState[1].filterTask).toBe(newFilter)
})