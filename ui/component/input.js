import moment from 'moment'
import React  from 'react'
import { TextareaAutosize, Typography, 
  FormControl, FormControlLabel, FormGroup, InputLabel,
  MenuItem, Select, Radio } from '@material-ui/core'


export function MaxHeightTextarea(props) { 
  return <FormControl variant="outlined" className={props.css.formControl}>
    <InputLabel id={props.name+'-label'}></InputLabel>
    <TextareaAutosize
      {...props}
      variant="outlined"
      required   
      autoFocus
      rowsMax={4}
    />
  </FormControl>
}


export function SelectCity(props) {
  let options = props.cities.map( c => 
    <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem> )

  return <FormControl variant="outlined" className={props.css.formControl}>
    <InputLabel id="city-select-label"></InputLabel>
    <Select id="city" 
      name="city"
      fullWidth
      displayEmpty
      labelId="city-select-label"                    
      value={props.value}
      onChange={props.onChange}
    >
      <MenuItem key="select_city" value=""><em>-- select city --</em></MenuItem>
      {options}
    </Select>            
  </FormControl>
}


export function SelectPlace(props) {
  if (!props.places) return null
  
  let options = props.places
    .map(p =><MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>)     

  return <FormControl variant="outlined" className={props.css.formControl}>
    <InputLabel id="place-select-label"></InputLabel>
    <Select labelId="place-select-label"                    
      id="place" 
      name="place"
      autoWidth
      fullWidth
      displayEmpty
      value={props.value}
      onChange={props.onChange}
    >
      <MenuItem key="select_place" value="">-- select climbing gym --</MenuItem>
      {options}
    </Select>
  </FormControl>
}


export function SelectDay(props) {
  let options = [0,1,2,3,4,5,6].map(n => ({ n,
    day: moment().add(n,'day').format('ddd'),
    date: moment().add(n,'day').format('Do MMM'),
  })).map(d => 
    <FormControlLabel 
      key={'day'+d.n}       
      control={<Radio onChange={props.onChange} value={d.n} checked={d.n===props.value} />}
      labelPlacement="top"
      label={<Typography>
        <time><b>{d.day}</b> {d.date}</time>  
      </Typography>}
    />)     

  return <FormGroup className="days" data-toggle="buttons" row>
    {options}
  </FormGroup>
}
