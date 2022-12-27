
import {userReducer} from './useReducer';

test('Редьюсер должен увеличить только возраст', () => {
  const startState = {age: 25, childrenCount: 15, name: 'Bobo'};
  const endState = userReducer(startState, {type: 'INCREMENT-AGE'})
  expect(endState.age).toBe(26)
  expect(endState.childrenCount).toBe(15)
})

test('Редьюсер должен увеличить только счётчик', () => {
  const startState_1 = {age: 25, childrenCount: 15, name: 'Bobo'}
  const endState = userReducer(startState_1, {type: 'INCREMENT-CHILDREN-COUNT'})
  expect(endState.childrenCount).toBe(16)
  expect(endState.age).toBe(25)

})

test('Reducer измени имя пользователя', () => {
  const startState_2 = {age: 25, childrenCount: 15, name: 'Bobo'}
  const endState_2 = userReducer(startState_2, {type: 'CHANGE-USER-NAME'})
  expect(endState_2.name).toBe('Alex')
  expect(endState_2.age).toBe(25)
  expect(endState_2.childrenCount).toBe(15)

})


