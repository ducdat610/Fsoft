import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
    name: 'nav',
    initialState: {
        value: false
    },
    reducers: {
        isChange: (state, action) => {
            state.value = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { isChange } = navSlice.actions

export default navSlice.reducer