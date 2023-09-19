import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initCategories } from '../store/categorySlice'
import { initMachines } from '../store/machineSlice'
import { Category, Machine } from '../types'


export default function SyncStoreLocal({ children }: { children: React.ReactNode }) {
    const { categories } = useAppSelector(store => store.categories)
    const { machines } = useAppSelector(store => store.machines)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        (async function () {
            if (categories.length > 0 || machines.length > 0) {
                const store = { machines, categories }
                await AsyncStorage.setItem('store', JSON.stringify(store))
            }
        })()
    }, [categories, machines])

    React.useEffect(() => {
        (async function () {
            const { categories, machines } = JSON.parse(await AsyncStorage.getItem('store')) as ({ categories: Category[], machines: Machine[] })

            if (categories) {
                dispatch(initCategories(categories))
            }

            if (machines) {
                dispatch(initMachines(machines))
            }
        })()
    }, [])

    return (
        <>
            {children}
        </>
    )
}