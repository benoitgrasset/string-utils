import React from 'react';
import './App.css';
import { TextField } from "@mui/material"

const App = () => {
  const [valueA, setValueA] = React.useState("")
  const [valueB, setValueB] = React.useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: "A" | "B") => {
    switch (field) {
      case "A":
        return setValueA(event.target.value)
      case "B":
        return setValueB(event.target.value)
    }
  }
  return (
    <div className="App">
      <h1>String utils</h1>
      <div className='container'>
        <div>
          <h2>Liste A</h2>
          <TextField value={valueA}
            onChange={(event) => handleChange(event, "A")} multiline />
        </div>
        <div>
          <h2>Liste B</h2>
          <TextField value={valueB}
            onChange={(event) => handleChange(event, "B")} multiline />
        </div>
      </div>
    </div>
  );
}

export default App;
