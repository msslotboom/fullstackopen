import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    updateAnecdote(state, action){
      const updatedAnecdote = action.payload
      const id = updatedAnecdote.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )    
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {voteForAnecdoteInSlice, appendAnecdote, setAnecdotes, updateAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = content => {
  return async dispatch => {
    const updatedVotesAnecdote = {
      ...content,
      votes: content.votes + 1
    }
    const newAnecdote = await anecdoteService.updateAnecdote(updatedVotesAnecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer