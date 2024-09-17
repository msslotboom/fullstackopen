import { useSelector, useDispatch } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { updateNotificationVoted } from "../reducers/notificationReducer"

const AnecdoteList = () => {

	const dispatch = useDispatch()

	const vote = (anecdote) => {
		dispatch(voteForAnecdote(anecdote))
		dispatch(updateNotificationVoted(anecdote.content))
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
				<button onClick={() => vote(anecdote)}>vote</button>
				</div>
			</div>
			)}
		</>
	)
}

export default AnecdoteList