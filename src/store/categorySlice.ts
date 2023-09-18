import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../types'



const initialState: {
    categories: Category[]
} = {
    categories: []
}


export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        createCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload)
        },
        deleteCategory: (state, action: PayloadAction<Category | number>) => {
            if (typeof action.payload === 'number') {
                state.categories = state.categories.filter((_, i) => i === action.payload)
            } else {
                state.categories = state.categories.filter(category => category === action.payload)
            }
        }
    },
})

export const { createCategory, deleteCategory } = categorySlice.actions

export default categorySlice.reducer