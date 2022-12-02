import React, {useState} from 'react';
import './App.css';
import {Todolist} from './component/Todolist';
import {v1} from 'uuid';


export type SelectionType = 'All' | 'Completed' | 'Active'
export type  TodoListsStateType = {
  id: string
  title: string
  filterTask: SelectionType
}

function App() {

  function deleteTaskHandler(id: string, todoListId: string) {
    let tasks = tasksObg[todoListId]
    tasksObg[todoListId] = tasks.filter(el => el.id !== id)  //<---пропусти таски id которых не равны id той, которую нужно удалить
    setTasksObg(tasksObg)

  }

  const changeSelection = (value: SelectionType, todoListsId: string) => {
    let todoList = todoLists.find((tl) => tl.id === todoListsId)
    if (todoList) {
      todoList.filterTask = value;
      setTodoLists([...todoLists])
    }
  };

  function addNewTask(title: string, todoListsId: string) {
    let newTask = {id: v1(), title: title, isDone: false}
    let tasks = tasksObg[todoListsId]
    // let newTasks = [newTask, ...tasks]   ///избыточная запись для примера. можно от переменной tasksObg[todoListsId] = [newTask, ...tasksObg]
    tasksObg[todoListsId]=[newTask, ...tasks]
    setTasksObg({...tasksObg})

  }

  const changeStatusTasks = (taskId: string, isDone: boolean,todoListsId: string ) => {
    let tasks = tasksObg[todoListsId]
    let task = tasks.find((el) => el.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasksObg({...tasksObg})
    }
    // let newTasks = [...tasksObg]


  }
  let [todoLists, setTodoLists] = useState<Array<TodoListsStateType>>([
    {id: v1(), title: 'What to learn', filterTask: 'Completed'},
    {id: v1(), title: 'What to buy', filterTask: 'Active'},
  ])

  let todoListsId_1 = v1()
  let todoListsId_2 = v1()

  let [tasksObg, setTasksObg] = useState({
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
  return (
    <div className="App">
      {todoLists.map((tl) => {
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
          deleteTask={ deleteTaskHandler}
          changeSelection={changeSelection}
          addNewTask={addNewTask}
          changeStatus={changeStatusTasks}
          filterTask={tl.filterTask}
        />
      })}
    </div>
  );
}

export default App;
