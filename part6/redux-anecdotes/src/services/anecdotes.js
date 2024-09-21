import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
	const anecdoteObject = {
		content: content,
		votes: 0
	}
	const response = await axios.post(baseUrl, anecdoteObject)
	return response.data
}

const updateAnecdote = async (content) => {
	const id = content.id
	const response = await axios.put(`${ baseUrl }/${id}`, content)
	return response.data
}

export default { getAll, createNew, updateAnecdote }