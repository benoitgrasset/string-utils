import React from 'react';
import './App.css';
import { TextField, ToggleButtonGroup, ToggleButton } from "@mui/material"

const nbRows = 20;

type IOperation = "intersection" | "union" | "A" | "B";

const App = () => {
  const [valueA, setValueA] = React.useState<string>("")
  const [valueB, setValueB] = React.useState<string>("")
  const [operation, setOperation] = React.useState<IOperation>('intersection')

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
          if (listB.includes(listA[i])) { intersection.push(listA[i]) }
        }
        return intersection
      case "union":
        let union: string[] = []
        let array = [...listA, ...listB]
        for (let i = 0; i < array.length; i++) {
          if (!union.includes(array[i])) { union.push(array[i]) }
        }
        return union
      case "A":
        return listA.filter(e => !listB.includes(e))
      case "B":
        return listB.filter(e => !listA.includes(e))
    }
  }

  const result = getResult() || [];

  return (
    <div className='App'>
      <h1>String utils</h1>
      <div className='container'>
        <div className='inputs'>
          <div>
            <h2>Liste A</h2>
            <TextField value={valueA}
              onChange={(event) => handleChange(event, "A")} multiline rows={nbRows} />
          </div>
          <div>
            <h2>Liste B</h2>
            <TextField value={valueB}
              onChange={(event) => handleChange(event, "B")} multiline rows={nbRows} />
          </div>
        </div>
        <div className='outputs'>
          <ToggleButtonGroup
            color="primary"
            value={operation}
            exclusive
            onChange={handleChangeOperation}
          >
            <ToggleButton value="intersection">Intersection</ToggleButton>
            <ToggleButton value="union">Union</ToggleButton>
            <ToggleButton value="A">Unique à A</ToggleButton>
            <ToggleButton value="B">Unique à B</ToggleButton>
          </ToggleButtonGroup>
          <div>
            <h2>Résultat</h2>
            <div className='list'>
              {result.map((e, index) => {
                return <span key={e + index}>{e}</span>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
