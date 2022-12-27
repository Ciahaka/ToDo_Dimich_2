import React from 'react';
import {userReducer} from './useReducer';

test('Редьюсер должен увеличить только возраст', ()=>{
  const startState ={age:25,childrenCount:15,name:'Bobo'};
  const endState = userReducer(startState, {type:'INCREMENT-AGE'})
  expect(endState.age).toBe(26)
  expect(endState.childrenCount).toBe(15)
})

test('Редьюсер должен увеличить только счётчик', () =>{
  const startState_1 ={age:25,childrenCount:15,name:'Bobo'}
  const  endState = userReducer(startState_1,{type:'INCREMENT-CHILDREN-COUNT'})
  expect(endState.childrenCount).toBe(16)
  expect(endState.age).toBe(25)
})