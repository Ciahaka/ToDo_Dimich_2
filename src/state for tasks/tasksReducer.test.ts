import {deleteTaskAC, tasksReducer} from './tasksReducer'
import {TaskStateType} from '../App'

test('correct task should be deleted from correct array', () => {
  const startState: TaskStateType = {
    'todolistId1': [
      {id: '1', title: 'JS', isDone: false},
      {id: '2', title: 'HTMl', isDone: true},
      {id: '3', title: 'Redux', isDone: false},
      {id: '4', title: 'React', isDone: false},
    ],
    'todolistId2': [
      {id: '1', title: 'Milk', isDone: false},
      {id: '2', title: 'Bread', isDone: true},
      {id: '3', title: 'Ku-ku-ru-ka', isDone: false}
    ]
  }

  const action = deleteTaskAC('2', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'JS', isDone: false},
      {id: '2', title: 'HTMl', isDone: true},
      {id: '3', title: 'Redux', isDone: false},
      {id: '4', title: 'React', isDone: false},
    ],
    'todolistId2': [
      {id: '1', title: 'Milk', isDone: false},
      {id: '3', title: 'Ku-ku-ru-ka', isDone: false}
    ]
  })
  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every(el => el.id !== '2')).toBeTruthy()
  expect(endState['todolistId2'][0].id).toBe('1')
  expect(endState['todolistId2'][1].id).toBe('3')

})
