import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { updateNotificationAdded } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	
	const createAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		const anecdoteObject = await anecdoteService.createNew(content)
		dispatch(addAnecdote(anecdoteObject))
		console.log(anecdoteObject)
		dispatch(updateNotificationAdded(anecdoteObject.content))
	}
	return (
		<form onSubmit={createAnecdote}>
			<div><input name = "anecdote" /></div>
			<button>create</button>
		</form>
	)
}
export default AnecdoteForm