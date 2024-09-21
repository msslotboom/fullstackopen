import { useDispatch } from "react-redux"
import { updateNotificationAdded } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	
	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		dispatch(createAnecdote(content))
		event.target.anecdote.value = ''
		dispatch(updateNotificationAdded(content))
	}
	return (
		<form onSubmit={addAnecdote}>
			<div><input name = "anecdote" /></div>
			<button>create</button>
		</form>
	)
}
export default AnecdoteForm