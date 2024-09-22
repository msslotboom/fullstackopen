import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
	axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
	if (newAnecdote.content.length < 5){
		throw new Error("anecdote needs at least 5 characters!")
	}
	else{
		return axios.post(baseUrl, newAnecdote).then(res => {res.data})
	}
}


export const updateAnecdote = newAnecdote => {
	const id = newAnecdote.id
	return axios.put(`${ baseUrl }/${id}`, newAnecdote).then(res => res.data)
}