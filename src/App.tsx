import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from './component/Todolist';
import {v1} from 'uuid';


export type SelectionType = 'All' | 'Completed' | 'Active'

function App() {
  let [tasks, setTasks] = useState<Array<TaskPropsType>>([
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'HTMl', isDone: false},
    {id: v1(), title: 'Redux', isDone: true},
    {id: v1(), title: 'React', isDone: false},
  ])

  let [stateSelection, setStateSelection] = useState<SelectionType>('All')


  function deleteTaskHandler(id: string) {
    let filteredTasks = tasks.filter(el => el.id !== id)  //<---пропусти таски id которых не равны id той, которую нужно удалить
    setTasks(filteredTasks)

  }

  let selection = tasks
  if (stateSelection === 'Completed') {
    selection = tasks.filter(el => el.isDone)
  }
  if (stateSelection === 'Active') {
    selection = tasks.filter(el => !el.isDone)
  }

  const changeSelection = (value: SelectionType) => {
    setStateSelection(value)
  };

  function addNewTask (title:string) {
    let newTask = {id: v1(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)

  }

  const changeStatusTasks =(taskId:string, isDone:boolean)=>{
    let task = tasks.find((el)=>el.id === taskId)
    if(task){
      task.isDone = isDone
    }
    // let newTasks = [...tasks]
    setTasks([...tasks])
  }

  return (
    <div className="App">
      <Todolist
        title={'What to learn'}
        tasks={selection}
        deleteTask={deleteTaskHandler}
        changeSelection={changeSelection}
        addNewTask={addNewTask}
        changeStatus={changeStatusTasks}
        filterTask={stateSelection}
      />


    </div>
  );
}

export default App;
