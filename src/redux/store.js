import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './dashboardReducer'

export const store = configureStore({
  reducer: {
    dashboardReducer: dashboardReducer
  },
})