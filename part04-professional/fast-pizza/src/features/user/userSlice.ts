import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchUserAddress, GeoAddress } from '../../services/apiGeocoding'
import { RootState } from '../../store'

export type User = {
	name: string
	email: string
}
export type Address = {
	status: string
	error: string
	data: GeoAddress | null
}
export type UserState = {
	name: string
	email: string
	address: Address
}
const initialState: UserState = {
	name: '',
	email: '',
	address: {
		status: 'idle',
		error: '',
		data: null
	},
}

export const fetchAddressThunk = createAsyncThunk('user/fetchAddress', fetchUserAddress)
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
	extraReducers: builder => {
		builder.addCase(fetchAddressThunk.pending, (state) => {
			state.address.status = 'loading'
			state.address.error = ''
			state.address.data = null
		})
		builder.addCase(fetchAddressThunk.fulfilled, (state, action) => {
			state.address.status = 'idle'
			state.address.error = ''
			state.address.data = action.payload
		})
		builder.addCase(fetchAddressThunk.rejected, (state) => {
			state.address.status = 'error'
			state.address.error = 'Oops! Something Went Wrong While Fetching Your Address, Make Sure To Fill The Address Field Correctly'
			state.address.data = null
		})
	},
})

export const { setUser, updateName, updateEmail } = userSlice.actions
export default userSlice.reducer

export const selectUserName = (state: RootState) => state.user.name
export const selectUserEmail = (state: RootState) => state.user.email
export const selectUserAddress = (state: RootState) => state.user.address
