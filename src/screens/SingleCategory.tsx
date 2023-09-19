import * as React from 'react';
import { View, Text, ListRenderItem, FlatList } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Button } from '../components';
import { useAppDispatch, useAppSelector, useListColumn } from '../hooks';
import { createMachine, editMachine, deleteMachine } from '../store/machineSlice';
import { Machine as TMachine, Category as TCategory } from '../types';
import { generateRandomUUID } from '../utils';
import Machine from '../components/ui/machine';

interface ScreenProps {
    navigation: NavigationProp<any, any>
    route: RouteProp<any, any>
}

export default function SingleCategory(props: ScreenProps) {
    const { categories } = useAppSelector(store => store.categories)
    const { machines } = useAppSelector(store => store.machines)
    const selectedCategory = categories.find(category => category.id === props.route.name)
    const dispatch = useAppDispatch()
    const columnCount = useListColumn({ mobile: 1, tab: 2 })

    const generateDefaultMachine = React.useCallback(() => ({
        id: generateRandomUUID(),
        typeId: selectedCategory?.id || '',
        attributes: selectedCategory?.fields.map((curr) => ({ ...curr, value: "" })) || []
    }), [selectedCategory])

    const _renderItem: ListRenderItem<TMachine> = ({ item, index }) => {
        return (
            <View style={{ width: `${(100 / columnCount)}%`, paddingRight: columnCount > 1 ? index % 2 === 1 ? 0 : 12 : 0, paddingLeft: columnCount > 1 ? index % 2 === 1 ? 12 : 0 : 0 }}>
                <Machine {...item} />
            </View>
        )
    }

    return (
        <FlatList
            key={columnCount}
            contentContainerStyle={{ padding: 16, gap: 24 }}
            numColumns={columnCount}
            data={machines.filter(machine => machine.typeId === selectedCategory?.id)}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>{selectedCategory.name}</Text>
                    <Button
                        style={{ paddingHorizontal: 12 }}
                        onPress={() => dispatch(createMachine(generateDefaultMachine()))}
                    >
                        Add {selectedCategory.name.toLowerCase()}
                    </Button>
                </View>
            )}
        />
    )
}
