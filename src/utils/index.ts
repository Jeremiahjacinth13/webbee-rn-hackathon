import uuid from 'react-native-uuid'
import { CategoryFieldType, Category as TCategory } from '../types'

export const generateRandomUUID = () => uuid.v4().toString()

export const getDefaultCategory = () => {

    const category: TCategory = {
        id: generateRandomUUID(),
        name: "New Category",
        fields: [{ key: "", type: CategoryFieldType.text, id: generateRandomUUID() }],
        titleField: null
    }

    return category
}

export function debounce(func: Function, time: number) {

}