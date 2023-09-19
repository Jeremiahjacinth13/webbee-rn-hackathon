import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Machine } from '../types'



const initialState: {
    machines: Machine[]
} = {
    machines: []
}


export const machinesSlice = createSlice({
    name: 'machines',
    initialState,
    reducers: {
        createMachine: (state, action: PayloadAction<Machine>) => {
            state.machines.push(action.payload)
        },
        deleteMachine: (state, action: PayloadAction<Machine | string>) => {
            if (typeof action.payload === 'string') {
                state.machines = state.machines.filter(c => c.id !== action.payload)
            } else {
                state.machines = state.machines.filter(c => c !== action.payload)
            }
        },
        editMachine: (state, action: PayloadAction<Machine>) => {
            const categoryIndex = state.machines.findIndex(c => c.id == action.payload.id)
            if (categoryIndex !== -1) {
                state.machines[categoryIndex] = action.payload
            }
        },
        initMachines: (state, action: PayloadAction<Machine[]>) => {
            state.machines = action.payload
        },
        resetMachines: (state) => {
            state.machines = []
        }
    }
})

export const { 
    createMachine, 
    editMachine, 
    deleteMachine, 
    initMachines,
    resetMachines
} = machinesSlice.actions

export default machinesSlice.reducer