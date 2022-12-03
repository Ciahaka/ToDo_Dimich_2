import React, {useState} from 'react';
import './App.css';
import {Todolist} from './component/Todolist';
import {v1} from 'uuid';

export type SelectionType = 'All' | 'Completed' | 'Active'

export type TaskPropsType = {
  id: string
  title: string
  isDone: boolean

}
export type  TodoListsStateType = {
  id: string
  title: string
   filterTask: SelectionType
}
type TaskStateType={
  [todoListsId:string]:Array<TaskPropsType>
}

function App() {
  const todoListsId_1 = v1()
  const todoListsId_2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListsStateType>>([
    {id: v1(), title: 'What to learn', filterTask: 'All'},
    {id: v1(), title: 'What to buy', filterTask: 'All'},
  ])

  const [tasksObg, setTasks] = useState<TaskStateType>({
    [todoListsId_1]: [
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'HTMl', isDone: false},
      {id: v1(), title: 'Redux', isDone: true},
      {id: v1(), title: 'React', isDone: false},
    ],
    [todoListsId_2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Bread', isDone: false},
      {id: v1(), title: 'Ku-ku-ru-ka', isDone: true},
    ]
  })

  const deleteTaskHandler = (id: string, todoListId: string) => {
  const tasks = tasksObg[todoListId]
    tasksObg[todoListId] = tasks.filter(el => el.id !== id)  //<---пропусти таски id которых не равны id той, которую нужно удалить
    setTasks(tasksObg)

  }

  const changeSelection = (value: SelectionType, todoListsId: string) => {
    const todoList = todoLists.find((tl) => tl.id === todoListsId)
    if (todoList) {
      todoList.filterTask = value;
      setTodoLists([...todoLists])
    }
  };

  const addNewTask = (title: string, todoListsId: string) => {
    const newTask = {id: v1(), title: title, isDone: false}
    const tasks = tasksObg[todoListsId]
    // let newTasks = [newTask, ...tasksObg]   ///избыточная запись для примера. можно от переменной tasksObg[todoListsId] = [newTask, ...tasksObg]
    tasksObg[todoListsId] = [newTask, ...tasks]
    setTasks({...tasksObg})

  }

  const changeStatusTasks = (taskId: string, isDone: boolean, todoListsId: string) => {
    const tasks = tasksObg[todoListsId]
    const task = tasks.find((el) => el.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObg})
    }
  }

const delTodolist = (todoListsId: string) => {
   const filteredTodo = todoLists.filter(el => el.id !== todoListsId)
    setTodoLists(filteredTodo)
    delete tasksObg[todoListsId]
    setTasks({...tasksObg})
  }

  return (
    <div className="App">
      {todoLists.map((tl) => {
        debugger
         let selection = tasksObg[tl.id]
        if (tl.filterTask === 'Completed') {
          selection = selection.filter(el => el.isDone)
        }
        if (tl.filterTask === 'Active') {
          selection = selection.filter(el => !el.isDone)
        }
        return <Todolist
          key={tl.id}
          todoListsId={tl.id}
          title={tl.title}
          tasks={selection}
          deleteTask={deleteTaskHandler}
          changeSelection={changeSelection}
          addNewTask={addNewTask}
          changeStatus={changeStatusTasks}
          filterTask={tl.filterTask}
          delTodolist={delTodolist}
        />
      })}
    </div>
  );
}

export default App;
