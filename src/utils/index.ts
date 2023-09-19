import uuid from 'react-native-uuid'
import { CategoryFieldType, Category as TCategory } from '../types'

export const generateRandomUUID = () => uuid.v4().toString()

export const getDefaultCategory = () => {

    const category: TCategory = {
        id: generateRandomUUID(),
        name: "Unnamed Category",
        fields: [{ key: "", type: CategoryFieldType.text, id: generateRandomUUID() }],
        titleField: null
    }

    return category
}

export function debounce<T extends Function>(fn: T, time: number): T {
    let timeout: NodeJS.Timeout;

    function debounced () {
        if (timeout) {
            clearTimeout(timeout)
        } 
        timeout = setTimeout(() => {
            fn(...arguments)
        }, time)
    }

    return debounced as unknown as T
}