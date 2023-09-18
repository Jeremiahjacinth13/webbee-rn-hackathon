import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import machinReducer from './machineSlice'

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    machines: machinReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch