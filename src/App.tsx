import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskPropsType} from './component/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './component/AddItemForm';
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

export type SelectionType = 'All' | 'Completed' | 'Active'


export type  TodoListsStateType = {
  id: string
  title: string
  filterTask: SelectionType
}
type TaskStateType = {
  [todoListsId: string]: Array<TaskPropsType>
}

function MenuIcon() {
  return null;
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
  const changeTaskTitle = (taskId: string, newTitle: string, todoListsId: string) => {
    const tasks = tasksObg[todoListsId]
    const task = tasks.find((el) => el.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({...tasksObg})
    }
  }

  const delTodolist = (todoListsId: string) => {
    const filteredTodo = todoLists.filter(el => el.id !== todoListsId)
    setTodoLists(filteredTodo)
    delete tasksObg[todoListsId]
    setTasks({...tasksObg})
  }


  const addNewTodoList = (title: string) => {
    const todoList: TodoListsStateType = {
      id: v1(),
      title: title,
      filterTask: 'All'
    }
    setTodoLists([todoList, ...todoLists])
    setTasks({...tasksObg, [todoList.id]: []})

  }

  const addNewTitleTodo = (todoListsId: string, newTitle: string) => {
    const changeTitleTodo = todoLists.find(tl => tl.id === todoListsId)
    if (changeTitleTodo) {
      changeTitleTodo.title = newTitle
      setTodoLists([...todoLists])
    }
    return todoLists
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
  const todoListsComponents = todoLists.map((tl) => {
    const selectionTasks = getFilteredTasks(tasksObg[tl.id], tl.filterTask)


    return (

      <Grid2>
        <Paper style={{padding:'18px'}}>
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
          changeTitleBlur={changeTaskTitle}
          newTitleTodo={addNewTitleTodo}
        />
        </Paper>
      </Grid2>
    )
  })

  return (
    <div>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            My TodoList project
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container style={{padding:'18px'}}>
          <Paper style={{padding:'3px'}}>
          <AddItemForm addItem={addNewTodoList}/>
          </Paper>
        </Grid2>
        <Grid2 container spacing={4}>
          {todoListsComponents}
        </Grid2>
      </Container>
    </div>
  );
}

export default App;
