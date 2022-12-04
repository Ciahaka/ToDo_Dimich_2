import React, {useState} from 'react';
import './App.css';
import {Todolist,TaskPropsType} from './component/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './component/AddItemForm';

export type SelectionType = 'All' | 'Completed' | 'Active'


export type  TodoListsStateType = {
  id: string
  title: string
  filterTask: SelectionType
}
type TaskStateType = {
  [bug: string]: Array<TaskPropsType>
}

function App() {
  const todoListsId_1 = v1()
  const todoListsId_2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListsStateType>>([
    {id: todoListsId_1, title: 'What to learn', filterTask: 'All'},
    {id: todoListsId_2, title: 'What to buy', filterTask: 'All'},
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
    setTasks({...tasksObg})

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

  const getFilteredTasks = (tasks: Array<TaskPropsType>, filterTask: SelectionType) => {

    let selectionTasks = tasks
    if (filterTask === 'Completed') {
      selectionTasks = tasks.filter(el => el.isDone)
    }
    if (filterTask === 'Active') {
      selectionTasks = tasks.filter(el => !el.isDone)
    }
    return selectionTasks
  }

  const addNewTodoList = (title: string) => {
    const todoList: TodoListsStateType = {
      id: v1(),
      title: title,
      filterTask:'All'
    }
    setTodoLists([todoList, ...todoLists])
    setTasks({...tasksObg,[todoList.id]:[]})

  }

  const todoListsComponents = todoLists.map((tl) => {
    const selectionTasks = getFilteredTasks(tasksObg[tl.id], tl.filterTask)


    return (


      <Todolist
        key={tl.id}
        todoListsId={tl.id}
        title={tl.title}
        filterTask={tl.filterTask}
        tasks={selectionTasks}
        deleteTask={deleteTaskHandler}
        changeSelection={changeSelection}
        addNewTask={addNewTask}
        changeStatus={changeStatusTasks}
        delTodolist={delTodolist}
      />
    )
  })

  return (
    <div className="App">
      <AddItemForm addItem={addNewTodoList}/>
      {todoListsComponents}
    </div>
  );
}

export default App;
