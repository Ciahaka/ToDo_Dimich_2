
export type StateType = {
  age: number
  childrenCount: number
  name: string
}

export type ActionType = {
  type: string
  [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
  // const newState = {...training state}
  switch (action.type) {
    case 'INCREMENT-AGE':
      // newState.age = training state.age + 1;
      // return newState
      return {...state, age: state.age + 1}
    case 'INCREMENT-CHILDREN-COUNT':
      // newState.childrenCount = training state.childrenCount + 1
      // return newState
      return {...state, childrenCount: state.childrenCount + 1}
    case 'CHANGE-USER-NAME':
      return {...state, name: state.name = 'Alex'}
    default:
      throw new Error('Спасите! Не знаю, что делать!')
  }
}