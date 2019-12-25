import React from 'react';
import { Chart } from 'react-charts'
import rungeKutta4 from './runge'

const b1 = 0.001
const b2 = 5.5 // Actually, b2 * m
const m = 0.4 // Actually, b2 * m

const dIdN = (T) => (N, I) => {

  return (-b1 * T * I) / (b1 * T * I - b2 * m * N)

  // return b1 * T * I - Math.pow((b1 * T * I - b2TimesM * N), 1 / (b2TimesM))
}

const dIdt = (T) => (t, I) => -b1 * T * I

const dNdt = (T, I) => (t, N) => b1 * T * I - b2 * m * N

function App() {
  const [x0, setX0] = React.useState(0)
  const [y0, setY0] = React.useState(0)
  const [T, setT] = React.useState(20)
  const [h, setH] = React.useState(0.1)
  const [i, setI] = React.useState(200)
  const result = React.useMemo(
    () => rungeKutta4(dNdt(parseFloat(T), 200), parseFloat(x0), parseFloat(y0), parseFloat(h), parseInt(i)),
    [h, i, x0, y0, T]
  )

  const data = React.useMemo(
    () => [
      {
        label: 'Series',
        data: result,
      },
    ],
    [result]
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div>
      <div
        style={{
          width: '90vw',
          height: '90vh'
        }}
      >
        <Chart data={data} axes={axes} />
      </div>
      <label>h: </label>
      <input type="text" onChange={(e) => setH(e.target.value)} value={h} />
      <label>i: </label>
      <input type="text" onChange={(e) => setI(e.target.value)} value={i} />
      <label>N0: </label>
      <input type="text" onChange={(e) => setX0(e.target.value)} value={x0} />
      <label>I0: </label>
      <input type="text" onChange={(e) => setY0(e.target.value)} value={y0} />
      <label>T </label>
      <input type="text" onChange={(e) => setT(e.target.value)} value={T} />
    </div>    
  );
}

export default App;
