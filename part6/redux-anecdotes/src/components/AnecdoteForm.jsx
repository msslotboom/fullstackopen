import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	
	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		dispatch(createAnecdote(content))
		event.target.anecdote.value = ''
		dispatch(setNotification("Added:" + content, 5))
	}
	return (
		<form onSubmit={addAnecdote}>
			<div><input name = "anecdote" /></div>
			<button>create</button>
		</form>
	)
}
export default AnecdoteForm