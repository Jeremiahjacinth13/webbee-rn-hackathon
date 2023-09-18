import * as React from 'react';
import { View, Text, ListRenderItem, FlatList } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Button } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createMachine, editMachine, deleteMachine } from '../store/machineSlice';
import { Machine as TMachine } from '../types';
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


    const DEFAULT_MACHINE: TMachine = React.useMemo(() => ({
        id: generateRandomUUID(),
        typeId: selectedCategory?.id || '',
        attributes: selectedCategory?.fields.map((curr) => ({ ...curr, value: "" })) || []
    }), [selectedCategory])


    const _renderItem: ListRenderItem<TMachine> = ({ item }) => {
        return (
            <Machine {...item} />
        )
    }

    return (
        <FlatList
            contentContainerStyle={{ padding: 16, gap: 16 }}
            data={machines.filter(machine => machine.typeId === selectedCategory?.id)}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>{selectedCategory.name}</Text>
                    <Button
                        style={{ paddingHorizontal: 12 }}
                        onPress={() => dispatch(createMachine(DEFAULT_MACHINE))}
                    >
                        Add {selectedCategory.name.toLowerCase()}
                    </Button>
                </View>
            )}
        />
    )
}
