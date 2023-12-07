import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/login/loginSlice'
import navSlice from '../features/login/navSlice'

export default configureStore({
    reducer: {
        login: loginSlice,
        nav: navSlice
    }
})