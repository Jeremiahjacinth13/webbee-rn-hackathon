import * as React from 'react'
import { Category } from "../types";
import { View, Text } from 'react-native'
import Button from "./ui/button";
import { useAppDispatch } from "../hooks";
import { generateRandomUUID } from '../utils';
import { createMachine } from '../store/machineSlice';


export default function MachineListHeader(category: Category) {

    const dispatch = useAppDispatch()

    const generateDefaultMachine = React.useCallback(() => ({
        id: generateRandomUUID(),
        typeId: category?.id || '',
        attributes: category?.fields.map((curr) => ({ ...curr, value: "" })) || []
    }), [category])


    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>Add {category.name}</Text>
            <Button
                style={{ paddingHorizontal: 12 }}
                onPress={() => dispatch(createMachine(generateDefaultMachine()))}
            >
                Add {category.name.toLowerCase()}
            </Button>
        </View>
    )
}