import React, {ChangeEvent} from 'react';
import {SelectionType} from '../App';
import {AddItemForm} from './AddItemForm';
import {ChangeSpanForm} from './ChangeSpanForm';
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import {
  Beenhere,
  BeenhereSharp,
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
    <div>
      <div>
        <h3>
          <ChangeSpanForm title={props.title} changeActiveBlur={changeTitleTodo}/>
          {/*{props.title}*/}

          <IconButton onClick={delTodolist} color={'primary'}><DeleteSharp/> </IconButton>
        </h3>
        <AddItemForm addItem={addNewTask}/>

        <List>

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

              <ListItem key={el.id}>
                <Checkbox onChange={changeStatusHandler}
                          checked={el.isDone}
                          color={'primary'}
                          icon={<BeenhereSharp/>}
                          checkedIcon={<Beenhere/>}/>

                <ChangeSpanForm title={el.title} changeActiveBlur={changeActiveBlurHandler}/>

                {/*<button className={s.button} onClick={deleteTaskHandler}>Del*/}
                {/*</button>*/}
                <IconButton onClick={deleteTaskHandler} color={'primary'} size={'large'}><DeleteForeverSharp/>
                </IconButton>
              </ListItem>
            )
          })}

        </List>
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