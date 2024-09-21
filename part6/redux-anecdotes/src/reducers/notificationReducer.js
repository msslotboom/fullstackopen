import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		updateNotification(state, action){
			return action.payload
		}
	}
})

export const { updateNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
	const notification = {content: content, time:time}
	return async dispatch => {
		dispatch(updateNotification(notification))
	}
}

export default notificationSlice.reducer