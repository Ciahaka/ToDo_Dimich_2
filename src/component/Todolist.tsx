import React, {ChangeEvent, useState} from 'react';
import s from './Todolist.module.css'
import {SelectionType} from '../App';
import {KeyboardEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {ChangeSpanForm} from './ChangeSpanForm';
import {Button, Checkbox, IconButton} from '@mui/material';
import {
  Beenhere,
  BeenhereSharp,
  Bookmark,
  BookmarkBorder,
  ClassSharp,
  DeleteForeverSharp,
  DeleteSharp
} from '@mui/icons-material';

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
  changeTitleBlur: (taskId: string, value: string, todoListsId: string) => void
  newTitleTodo: (todoListsId: string, newTitle: string) => void


}

export const Todolist = (props: PropsTodoType) => {

  const delTodolist = () => {
    props.delTodolist(props.todoListsId)
  }

  const addNewTask = (title: string) => {
    props.addNewTask(title, props.todoListsId)
  }
  const changeTitleTodo = (newTitle: string) => {
    props.newTitleTodo(props.todoListsId, newTitle)
  }

  return (
    <div className="App">
      <div>
        <h3 className={s.h3}>
          <ChangeSpanForm title={props.title} changeActiveBlur={changeTitleTodo}/>
          {/*{props.title}*/}

          <IconButton className={s.button} onClick={delTodolist} color={'primary'}><DeleteSharp/> </IconButton>
        </h3>
        <AddItemForm addItem={addNewTask}/>

        <ul className={s.ul}>

          {props.tasks.map((el) => {

            const deleteTaskHandler = () => props.deleteTask(el.id, props.todoListsId)

            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(el.id,
                e.currentTarget.checked, props.todoListsId)
            }
            const changeActiveBlurHandler = (value: string) => {
              props.changeTitleBlur(el.id, value, props.todoListsId)
            }

            return (

              <li key={el.id} className={`${s.li} ${el.isDone ? s.isDone : ''}`}>
                <Checkbox onChange={changeStatusHandler}
                          checked={el.isDone}
                          color={'primary'}
                          icon={<BeenhereSharp/>}
                          checkedIcon={<Beenhere/>}/>

                <ChangeSpanForm title={el.title} changeActiveBlur={changeActiveBlurHandler}/>

                {/*<button className={s.button} onClick={deleteTaskHandler}>Del*/}
                {/*</button>*/}
                <IconButton className={s.button} onClick={deleteTaskHandler} color={'primary'} size={'large'}><DeleteForeverSharp/> </IconButton>
              </li>
            )
          })}

        </ul>
        <div>
          <Button
            variant={props.filterTask === 'All' ? 'outlined' : 'text'}
            onClick={() => props.changeSelection('All', props.todoListsId)}>All
          </Button>
          <Button
            color={'primary'}
            variant={props.filterTask === 'Active' ? 'contained' : 'text'}
            onClick={() => props.changeSelection('Active', props.todoListsId)}>Active
          </Button>
          <Button
            color={'error'}
            variant={props.filterTask === 'Completed' ? 'contained' : 'text'}
            onClick={() => props.changeSelection('Completed', props.todoListsId)}>Completed
          </Button>
        </div>
      </div>
    </div>
  );
}