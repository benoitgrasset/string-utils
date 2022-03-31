import React from 'react';
import './App.css';
import { TextField, ToggleButtonGroup, ToggleButton, Button } from "@mui/material"

const nbRows = 25;

type IOperation = "intersection" | "union" | "A" | "B";

const labelSort = 'Sort (A to Z) ↑';
const labelUnsort = 'Sort (Z to A) ↓';

const flipName = (list: string): string => {
  return list.split('\n').map(name =>
    name.split(" ").reverse().join(" "))
    .join('\n')
}

const alphaSort = (list: string, order: "asc" | "desc"): string => {
  return order === "asc" ?
    list.split('\n').sort().join('\n')
    : list.split('\n').sort().reverse().join('\n')
}

const App: React.FC = () => {
  const [valueA, setValueA] = React.useState<string>("")
  const [valueB, setValueB] = React.useState<string>("")
  const [operation, setOperation] = React.useState<IOperation>('intersection')
  const [sortA, setSortA] = React.useState(true)
  const [sortB, setSortB] = React.useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: "A" | "B") => {
    switch (field) {
      case "A":
        return setValueA(event.target.value)
      case "B":
        return setValueB(event.target.value)
    }
  }

  const handleChangeOperation = (event: React.MouseEvent<HTMLElement>, operation: IOperation) => {
    setOperation(operation)
  }

  const listA: Array<string> = valueA.split('\n')
  const listB: Array<string> = valueB.split('\n')

  const getResult = () => {
    switch (operation) {
      case "intersection":
        let intersection = []
        for (let i = 0; i < listA.length; i++) {
          if (listA[i].length > 0 && listB.includes(listA[i])) {
            intersection.push(listA[i])
          }
        }
        return intersection
      case "union":
        let union: string[] = []
        let array = [...listA, ...listB]
        for (let i = 0; i < array.length; i++) {
          if (array[i].length > 0 && !union.includes(array[i])) {
            union.push(array[i])
          }
        }
        return union
      case "A":
        return listA.filter(e => !listB.includes(e))
      case "B":
        return listB.filter(e => !listA.includes(e))
    }
  }

  const result = getResult() || [];

  const handleLowercaseA = () => {
    setValueA(prevValue => prevValue.toLowerCase())
  };

  const handleUppercaseA = () => {
    setValueA(prevValue => prevValue.toUpperCase())
  };

  const handleLowercaseB = () => {
    setValueB(prevValue => prevValue.toLowerCase())
  };

  const handleUppercaseB = () => {
    setValueB(prevValue => prevValue.toUpperCase())
  };

  const handleFlipA = () => {
    setValueA(prevValue => flipName(prevValue))
  };

  const handleFlipB = () => {
    setValueB(prevValue => flipName(prevValue))
  };

  const handleSortA = () => {
    setValueA(prevValue => alphaSort(prevValue, sortA ? "asc" : "desc"))
    setSortA(prevState => !prevState)
  }

  const handleSortB = () => {
    setValueB(prevValue => alphaSort(prevValue, sortB ? "asc" : "desc"))
    setSortB(prevState => !prevState)
  }

  return (
    <div className='App'>
      <h1>String utils</h1>
      <div className='container'>
        <h2>Liste A</h2>
        <h2>Liste B</h2>
        <div>
          <ToggleButtonGroup
            color="primary"
            value={operation}
            exclusive
            onChange={handleChangeOperation}
            size="small"
            className='toggleButtonGroup'
          >
            <ToggleButton value="intersection">Intersection {operation === "intersection" && "(" + result.length + ")"}</ToggleButton>
            <ToggleButton value="union">Union {operation === "union" && "(" + result.length + ")"}</ToggleButton>
            <ToggleButton value="A">Unique à A {operation === "A" && "(" + result.length + ")"}</ToggleButton>
            <ToggleButton value="B">Unique à B {operation === "B" && "(" + result.length + ")"}</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className='button-group'>
          <Button variant='outlined' className='button' onClick={handleLowercaseA}>lowercase A</Button>
          <Button variant='outlined' className='button' onClick={handleUppercaseA}>UPPERCASE A</Button>
          <Button variant='outlined' className='button' onClick={handleFlipA}>nom ⟷ prénom</Button>
          <Button variant='outlined' className='button' onClick={handleSortA}>{sortA ? labelSort : labelUnsort}</Button>
        </div>
        <div className='button-group'>
          <Button variant='outlined' className='button' onClick={handleLowercaseB}>lowercase B</Button>
          <Button variant='outlined' className='button' onClick={handleUppercaseB}>UPPERCASE B</Button>
          <Button variant='outlined' className='button' onClick={handleFlipB}>nom ⟷ prénom</Button>
          <Button variant='outlined' className='button' onClick={handleSortB}>{sortB ? labelSort : labelUnsort}</Button>
        </div>
        <div></div>
        <TextField value={valueA}
          onChange={(event) => handleChange(event, "A")} multiline rows={nbRows} />
        <TextField value={valueB}
          onChange={(event) => handleChange(event, "B")} multiline rows={nbRows} />
        <div className='list'>
          {result.map((e, index) => {
            return <span key={e + index}>{e}</span>
          })}
        </div>
      </div >
    </div>
  );
}

export default App;
