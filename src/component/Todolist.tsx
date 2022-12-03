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
  todoListsId: string
  tasks: Array<TaskPropsType>
  filterTask: SelectionType

  delTodolist: (todoListsId: string) => void
  addNewTask: (title: string, todoListsId: string) => void
  deleteTask: (id: string, todoListsId: string) => void
  changeSelection: (value: SelectionType, todoListsId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todoListsId: string) => void


}


export const Todolist = (props: PropsTodoType) => {
  const [addInput, setAddInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setAddInput(e.currentTarget.value)

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      props.addNewTask(addInput, props.todoListsId);

      setAddInput('');
    }
  }
  const addTaskHandler = () => {
    if (addInput.trim() === '') {
      return setError('Поле не может быть пустым!')
    }
    props.addNewTask(addInput.trim(), props.todoListsId);
    setAddInput('');
  }
  const delTodolist = () => {
    props.delTodolist(props.todoListsId)
  }

  return (
    <div className="App">
      <div>
        <h3 className={s.h3}>{props.title}
          <button onClick={delTodolist}>DeL</button>
        </h3>
        <div>

          <input className={error ? s.error : ''} value={addInput} onChange={onChangeHandler}
                 onKeyDown={onKeyDownHandler}/>
          <button onClick={addTaskHandler}>+</button>
          {error && <div className={s.errorMessage}> {error} </div>}

        </div>

        <ul className={s.ul}>
          {props.tasks.map(el => {
            const onClickDeleteTaskHandler = () => props.deleteTask(el.id, props.todoListsId)
            const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(el.id, e.currentTarget.checked, props.todoListsId)
            }
            return (
              <li key={el.id} className={`${s.li} ${el.isDone ? s.isDone : ''}`}>
                <input type="checkbox" onChange={onChangeCheckHandler} checked={el.isDone}/> <span
                className={s.span}>{el.title}</span>
                <button className={s.button} onClick={onClickDeleteTaskHandler}>Del
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