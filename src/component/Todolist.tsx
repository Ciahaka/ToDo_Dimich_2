import React, {ChangeEvent, useState} from 'react';
import s from './Todolist.module.css'
import {SelectionType} from '../App';
import {KeyboardEvent} from 'react';

export type TaskPropsType = {
  id: string
  title: string
  isDone: boolean

}

type PropsTodoType = {
  title: string
  tasks: Array<TaskPropsType>
  deleteTask: (id: string) => void
  changeSelection: (value: SelectionType) => void
  addNewTask: (title: string) => void
  changeStatus: (taskId: string, isDone: boolean) => void
  filterTask:SelectionType
}


export const Todolist = (props: PropsTodoType) => {
  let [addInput, setAddInput] = useState('')
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setAddInput(e.currentTarget.value)

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      props.addNewTask(addInput);
      setAddInput('');
    }
  }
  const addTaskHandler = () => {
    if (addInput.trim() === '') {
      return setError('Поле не может быть пустым!')
    }
    props.addNewTask(addInput.trim());
    setAddInput('');
  }


  return (
    <div className="App">
      <div>
        <h3 className={s.h3}>{props.title}</h3>
        <div>

          <input className={error ? s.error : ''} value={addInput} onChange={onChangeHandler}
                 onKeyDown={onKeyDownHandler}/>
          <button onClick={addTaskHandler}>+</button>
          {error && <div className={s.errorMessage}> {error} </div>}

        </div>
        <ul className={s.ul}>
          {props.tasks.map((el) => {

            const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(el.id, e.currentTarget.checked)
            }

            return (
              <li key={el.id} className={`${s.li} ${el.isDone ? s.isDone : ''}`}>
                <input type="checkbox" onChange={onChangeCheckHandler} checked={el.isDone}/> <span
                className={s.span}>{el.title}</span>
                <button className={s.button} onClick={() => {
                  props.deleteTask(el.id)
                }}>Del
                </button>
              </li>

            )
          })}

        </ul>
        <div>
          <button className={props.filterTask === 'All' ? s.activeButton : ''} onClick={() => props.changeSelection('All')}>All</button>
          <button className={props.filterTask === 'Active' ? s.activeButton : ''} onClick={() => props.changeSelection('Active')}>Active</button>
          <button className={props.filterTask === 'Completed' ? s.activeButton : ''} onClick={() => props.changeSelection('Completed')}>Completed</button>
        </div>
      </div>
    </div>
  );
}