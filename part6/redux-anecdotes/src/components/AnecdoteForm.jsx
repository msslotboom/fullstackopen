import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	
	const createAnecdote = (event) => {
		console.log("All good here")
		event.preventDefault()
		const content = event.target.anecdote.value
		dispatch(addAnecdote(content))
	}
	return (
		<form onSubmit={createAnecdote}>
			<div><input name = "anecdote" /></div>
			<button>create</button>
		</form>
	)
}
export default AnecdoteForm