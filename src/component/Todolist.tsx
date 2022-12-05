import React, {ChangeEvent, useState} from 'react';
import s from './Todolist.module.css'
import {SelectionType} from '../App';
import {KeyboardEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {ChangeSpanForm} from './ChangeSpanForm';

export type TaskPropsType = {
  id: string
  title: string
  isDone: boolean

}

type PropsTodoType = {
  title: string
  todoListsId: string
  tasks: Array<TaskPropsType>
  filterTask: SelectionType

  delTodolist: (todoListsId: string) => void
  addNewTask: (title: string, todoListsId: string) => void
  deleteTask: (id: string, todoListsId: string) => void
  changeSelection: (value: SelectionType, todoListsId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todoListsId: string) => void
  changeTitleBlur: (taskId: string, value:string, todoListsId: string) => void


}

export const Todolist = (props: PropsTodoType) => {

  const delTodolist = () => {
    props.delTodolist(props.todoListsId)
  }

  const addNewTask = (title:string)=>{
    props.addNewTask(title,props.todoListsId)
  }

  return (
    <div className="App">
      <div>
        <h3 className={s.h3}>{props.title}
          <button onClick={delTodolist}>DeL</button>
        </h3>
        <AddItemForm addItem={addNewTask}/>

           <ul className={s.ul}>

          {props.tasks.map((el) => {

            const deleteTaskHandler = () => props.deleteTask(el.id, props.todoListsId)

            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(el.id,
                e.currentTarget.checked, props.todoListsId)
            }
            const changeActiveBlurHandler = (value:string) => {
              props.changeTitleBlur(el.id, value, props.todoListsId)
            }

            return (

              <li key={el.id} className={`${s.li} ${el.isDone ? s.isDone : ''}`}>
                <input type="checkbox" onChange={changeStatusHandler} checked={el.isDone}/>

                <ChangeSpanForm title={el.title} changeActiveBlur={changeActiveBlurHandler}/>

                <button className={s.button} onClick={deleteTaskHandler}>Del
                </button>
              </li>
            )
          })}

        </ul>
        <div>
          <button className={props.filterTask === 'All' ? s.activeButton : ''}
                  onClick={() => props.changeSelection('All', props.todoListsId)}>All
          </button>
          <button className={props.filterTask === 'Active' ? s.activeButton : ''}
                  onClick={() => props.changeSelection('Active', props.todoListsId)}>Active
          </button>
          <button className={props.filterTask === 'Completed' ? s.activeButton : ''}
                  onClick={() => props.changeSelection('Completed', props.todoListsId)}>Completed
          </button>
        </div>
      </div>
    </div>
  );
}