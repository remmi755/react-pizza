import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filrerSlice'

export const store = configureStore({
    reducer: {
        filter,
    },
})
