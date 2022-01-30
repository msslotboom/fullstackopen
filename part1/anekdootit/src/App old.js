import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {anecdotes[selected]} 
      <Button length={anecdotes.length}selected={selected}></Button>
      {console.log(selected)}
    </div>
  )
}
const Button = (length,selected) => {
  
  return(
    <button onClick={ () => selected[(Setrandom(max={length}))]}>next anecdote</button>
  )
}
const Setrandom = (max) =>{
  const random = Math.floor(Math.random() * (props.max+1));
  console.log(random)
  return random
}
export default App