import React  from 'react'
import { TextareaAutosize, FormControl, InputLabel } from '@material-ui/core'


export function MaxHeightTextarea(props) { return (
  <FormControl variant="outlined" className={props.css.formControl}>
    <InputLabel id={props.name+'-label'}></InputLabel>
    <TextareaAutosize
      {...props}
      variant="outlined"
      required   
      autoFocus
      rowsMax={4}
    />
  </FormControl>)
}
