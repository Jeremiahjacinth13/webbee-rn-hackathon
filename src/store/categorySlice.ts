import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'



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
        deleteCategory: (state, action: PayloadAction<Category | string>) => {
            if (typeof action.payload === 'string') {
                state.categories = state.categories.filter(c => c.id !== action.payload)
            } else {
                state.categories = state.categories.filter(c => c !== action.payload)
            }
        },
        editCategory: (state, action: PayloadAction<Category>) => {
            const categoryIndex = state.categories.findIndex(c => c.id == action.payload.id)
            if (categoryIndex !== -1) {
                state.categories[categoryIndex] = action.payload
            }
        },
        initCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload
        }
    },
})

export const { createCategory, deleteCategory, editCategory, initCategories } = categorySlice.actions

export default categorySlice.reducer