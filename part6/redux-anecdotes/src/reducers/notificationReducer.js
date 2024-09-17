import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		updateNotificationVoted(state, action){
			return "Voted for: " + action.payload
		},
		updateNotificationAdded(state, action){
			return "Added: " + action.payload
		}
	}
})

export const { updateNotificationVoted, updateNotificationAdded } = notificationSlice.actions
export default notificationSlice.reducer