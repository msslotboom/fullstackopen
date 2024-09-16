import { useSelector, useDispatch } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {

	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(voteForAnecdote(id))
	}

	const anecdotes = useSelector(state => {
		const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
		return filteredAnecdotes
	})

	return (
		<>
		{anecdotes.sort((firstAnecdote, secondAnecdote) => secondAnecdote.votes - firstAnecdote.votes).map(anecdote =>
			<div key={anecdote.id}>
				<div>
				{anecdote.content}
				</div>
				<div>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote.id)}>vote</button>
				</div>
			</div>
			)}
		</>
	)
}

export default AnecdoteList