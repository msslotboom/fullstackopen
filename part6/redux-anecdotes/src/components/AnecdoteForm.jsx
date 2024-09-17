import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { updateNotificationAdded } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	
	const createAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		dispatch(addAnecdote(content))
		dispatch(updateNotificationAdded(content))
	}
	return (
		<form onSubmit={createAnecdote}>
			<div><input name = "anecdote" /></div>
			<button>create</button>
		</form>
	)
}
export default AnecdoteForm