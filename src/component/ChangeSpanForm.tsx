import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

export type ChangeSpanFormPropsType = {
  title: string
  changeActiveBlur:(value:string)=>void
}

export const ChangeSpanForm = (props: ChangeSpanFormPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const addInputModeHandler =()=>{
    setEditMode(true)
    setTitle(props.title)
  }
const deActiveInputModeHandler = ()=>{
  setEditMode(false)
  props.changeActiveBlur(title)
}
const changeTitleInputHandler = (e:ChangeEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)

  return editMode
    ? <TextField variant={'standard'} value={title} onBlur={deActiveInputModeHandler} autoFocus onChange={changeTitleInputHandler}/>
    : <span onDoubleClick={addInputModeHandler}>{props.title}</span>;
};

