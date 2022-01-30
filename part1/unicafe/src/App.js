import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h2>give feedback</h2>
      <Button setValue = {setGood} value={good} name ="good"></Button>
      <Button setValue = {setNeutral} value={neutral} name ="neutral"></Button>
      <Button setValue = {setBad} value={bad} name ="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}
const StatisticLine = (props) =>{
  return(
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}
const Button = (props) => {
  return(
    <button onClick={() => props.setValue(props.value+1)}>{props.name}</button>
  )
}
const Statistics = (props) =>{
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const calculatePositive = (good,neutral,bad) => {
      return <tr><td>positive</td><td>{(good)/(good+neutral+bad)*100}%</td></tr>
    }

  const calculateAverage = (good,neutral,bad) => {
    return <tr><td>average</td><td>{(good-bad)/(good+neutral+bad)}</td></tr>
  }
  if (good+neutral+bad === 0) {
    return <div><h2>statistics</h2>No feedback given</div>
  }
  return(
    <div>
    <h2>statistics</h2>
    <table>
      <tbody>
      <StatisticLine text="good" value = {good}/>
      <StatisticLine text="neutral" value = {neutral}/>
      <StatisticLine text="bad" value = {bad}/>
      <tr><td>all</td><td>{good+neutral+bad}</td></tr>
      {calculateAverage(good,neutral,bad)}
      {calculatePositive(good,neutral,bad)}
      </tbody>
    </table>
    </div>
  )

  }
export default App