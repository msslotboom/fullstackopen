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

  const initialpoints = Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(initialpoints)
  
  const newAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
  }
  
  const increaseVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Anecdotes anecdote = {anecdotes[selected]}></Anecdotes><br></br>
      <VoteText point = {points[selected]}></VoteText>
      <VoteButton increaseVote = {increaseVote}></VoteButton>
      <Button newAnecdote={newAnecdote}></Button>
      <MostVotes anecdote={anecdotes[points.indexOf(Math.max(...points))]} votes = {Math.max(...points)}></MostVotes>
    </div>
  )
}
const Button = ({newAnecdote}) => {
    return(
        <button onClick={newAnecdote}>next anecdote</button>
    )
}
const Anecdotes = ({anecdote}) =>{
    return(
        <><h2>Anecdote of the day</h2>{anecdote}</>
    )
}
const VoteButton = ({increaseVote}) => {
  return(
  <button onClick={increaseVote}>vote</button>
  )
}

const VoteText = ({point}) => {
  return(
    <div>has {point} points</div>
  )
}
const MostVotes = ({anecdote, votes}) => {
  if (votes === 0){
    return(
      <div><h2>Anecdotes with most votes</h2>no votes yet</div>
    )
  }
  return(
    <div><h2>Anecdotes with most votes</h2>
    {anecdote}<br></br>has {votes} votes</div>
  )
}

export default App