import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
  tasksReducer
} from './tasksReducer'
import {TaskStateType} from '../App'
import {addTodolistAC, deleteTodolistAC} from '../01_state for todolist/todolistReducer';

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

test('correct task should be added to correct array', () => {
  const startState: TaskStateType = {
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
  }

  const action = addTaskAC('juce', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
  const startState: TaskStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = changeTaskStatusAC('2', false,  'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId1'][1].isDone).toBeTruthy()
  expect(endState['todolistId2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
  const startState: TaskStateType = {
    'todolistId1': [
      {id: '1', title: 'JS', isDone: false},
      {id: '2', title: 'HTMl', isDone: true},
      {id: '3', title: 'Redux', isDone: false},
      {id: '4', title: 'React', isDone: false},
    ],
    'todolistId2': [
      {id: '1', title: 'Milk', isDone: false},
      {id: '3', title: 'Ku-ku-ru-ka', isDone: true}
    ]
  }

  const action = changeTaskTitleAC( '3','salt', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'][1].isDone).toBeTruthy()
  expect(endState['todolistId2'][1].title).toBe('salt')
})

test('new array should be added when new todolist is added', () => {
  const startState: TaskStateType = {
    'todolistId1': [
      {id: '1', title: 'JS', isDone: false},
      {id: '2', title: 'HTMl', isDone: true},
      {id: '3', title: 'Redux', isDone: false},
      {id: '4', title: 'React', isDone: false},
    ],
    'todolistId2': [
      {id: '1', title: 'Milk', isDone: false},
      {id: '3', title: 'Ku-ku-ru-ka', isDone: true}
    ]
  }

  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const startState: TaskStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = deleteTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
