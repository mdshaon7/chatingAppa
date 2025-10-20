import { configureStore } from '@reduxjs/toolkit'
import userSlice, { userinfo } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    userinfo: userSlice,

  },
})