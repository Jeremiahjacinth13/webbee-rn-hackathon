import * as React from 'react';
import { View, Text, ListRenderItem, FlatList, SafeAreaView } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { MachineListHeader } from '../components';
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

    const _renderItem: ListRenderItem<TMachine> = ({ item, index }) => {
        return (
            <View style={{ width: `${(100 / columnCount)}%`, paddingRight: columnCount > 1 ? index % 2 === 1 ? 0 : 12 : 0, paddingLeft: columnCount > 1 ? index % 2 === 1 ? 12 : 0 : 0 }}>
                <Machine {...item} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                key={columnCount}
                contentContainerStyle={{ padding: 12, gap: columnCount > 1 ? 24 : 8, backgroundColor: 'white' }}
                numColumns={columnCount}
                data={machines.filter(machine => machine.typeId === selectedCategory?.id)}
                renderItem={_renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                    <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center' }}>No {selectedCategory.name} added</Text>
                    </View>
                )}
                ListHeaderComponent={() => <MachineListHeader {...selectedCategory} />}
            />
        </SafeAreaView>
    )
}
