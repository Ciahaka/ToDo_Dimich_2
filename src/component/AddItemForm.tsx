import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css';
import {Button, TextField} from '@mui/material';
import {BookmarkAddTwoTone} from '@mui/icons-material';


export type AddItemFormType={
  addItem: (title: string) => void
}

export const AddItemForm = (props:AddItemFormType) => {
  const [addInput, setAddInput] = useState('')
  const [error, setError] = useState<string | null>(null)


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setAddInput(e.currentTarget.value)

  const addTaskHandler = () => {
    if (addInput.trim() === '') {
      return setError('Поле не может быть пустым!')
    }
    props.addItem(addInput.trim ());
    setAddInput('');
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      props.addItem(addInput);

      setAddInput('');
    }
  }

  return (
    <div>
      <TextField
        variant={'outlined'}
        label={'Type Value'}
        error={!!error}
        helperText={error}
        // className={error ? s.error : ''}
        value={addInput}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}/>
      <Button
        onClick={addTaskHandler}
        color={'primary'}
        size={'large'} ><BookmarkAddTwoTone/> </Button>
      {/*{error && <div className={s.errorMessage}> {error} </div>}*/}

    </div>
  );
};

