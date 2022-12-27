
import {v1} from 'uuid';
import {TodoListsStateType} from '../App';
import {todoListReducer} from './todolistReducer';
test('удалить один тудулист из стейта по id', ()=>{
  const todoListsId_1 = v1()
  const todoListsId_2 = v1()
  const  startState:Array<TodoListsStateType> = [
    {id: todoListsId_1, title: 'What to learn', filterTask: 'All'},
    {id: todoListsId_2, title: 'What to buy', filterTask: 'All'},
  ]
  const endState = todoListReducer(startState,{type: 'DELETE-TODOLIST', id:todoListsId_1})
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListsId_2)
})