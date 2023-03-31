import React from 'react'
import ReactDOM from 'react-dom'
import { IconPicker } from './components/IconPicker'

ReactDOM.render(
  <>
    <IconPicker
      value=""
      formControlProps={{
        sx: { background: "red" }
      }} 
    />
  </>,
  document.getElementById('font-awesome')
)
