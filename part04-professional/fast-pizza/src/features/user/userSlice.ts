import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
	name: string
	email: string
}
const initialState: User = {
	name: '',
	email: '',
}
export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.name = action.payload.name
            state.email = action.payload.email
		},
		updateName(state, action: PayloadAction<string>) {
			state.name = action.payload
		},
		updateEmail(state, action: PayloadAction<string>) {
			state.email = action.payload
		},
	},
})

export const { setUser, updateName, updateEmail } = userSlice.actions
export default userSlice.reducer

export const selectUserName = (state: User) => state.name
export const selectUserEmail = (state: User) => state.email
