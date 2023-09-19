import * as React from 'react'
import { View, Text, StyleSheet, TextInput, Switch, useWindowDimensions } from 'react-native'
import { CategoryFieldType, Machine as TMachine } from '../../types'

import Button from './button'
import DateTimePicker from '@react-native-community/datetimepicker'
import { editMachine, deleteMachine } from '../../store/machineSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { debounce } from '../../utils'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function Machine(props: TMachine) {

    const { categories } = useAppSelector(store => store.categories)
    const selectedCategory = categories.find(category => category.id === props.typeId)
    const [machineState, setMachineState] = React.useState<TMachine>(props)
    const externalMachineState = useAppSelector(store => store.machines).machines.find(machine => machine.id === props.id)
    const windowDimensions = useWindowDimensions()

    const [isCollapsed, setCollapsed] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()

    const debouncedDispatch = React.useMemo(() => debounce(dispatch, 500), [])

    React.useEffect(() => {
        debouncedDispatch(editMachine(machineState))
    }, [machineState])

    React.useEffect(() => {
        setMachineState(externalMachineState)
    }, [externalMachineState])

    const handleAttributeChange = React.useCallback(({ key, value, id, type }: TMachine['attributes'][number]) => {

        setMachineState(oldMachineState => {
            const attrs = [...oldMachineState.attributes]
            const attributeIndex = attrs.findIndex(attr => attr.key === key)

            if (attributeIndex !== -1) {
                attrs[attributeIndex] = { ...attrs[attributeIndex], value }
            } else {
                attrs.push({ key, value, type, id })
            }

            const newMachineState = { ...oldMachineState, attributes: attrs }
            return newMachineState
        })
    }, [])

    const getAttributeComponent = React.useCallback((attr: TMachine['attributes'][number]) => {

        const value = machineState.attributes.find(a => a.id === attr.id)?.value

        switch (attr.type) {
            case CategoryFieldType.text:
                return (
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', flex: 1 }}>
                        <Text style={machineStyles.fieldLabel}>{attr.key}: </Text>
                        <TextInput
                            autoCapitalize='none'
                            style={{ ...machineStyles.textInput, flex: 2 }}
                            onChangeText={(text) => handleAttributeChange({ ...attr, value: text })}
                            placeholder={`Enter ${attr.key}`}
                            value={(value || '').toString()}
                        />
                    </View>
                )
            case CategoryFieldType.number:
                return (
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', flex: 1 }}>
                        <Text style={machineStyles.fieldLabel}>{attr.key}: </Text>
                        <TextInput
                            autoCapitalize='none'
                            keyboardType='numeric'
                            style={{ ...machineStyles.textInput, flex: 2 }}
                            onChangeText={(text) => handleAttributeChange({ ...attr, value: text })}
                            placeholder={`Enter ${attr.key}`}
                            value={machineState.attributes.find(a => a.id === attr.id)?.value.toString() || ''}
                        />
                    </View>
                )
            case CategoryFieldType.date:
                return (
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                        <Text>{attr.key}: </Text>
                        <DateTimePicker
                            value={Number.isNaN(Date.parse(String(value))) ? new Date() : new Date(String(value))}
                            mode={'date'}
                            is24Hour={true}
                            onChange={(_, date) => handleAttributeChange({ ...attr, value: date.toISOString() })}
                            style={{ marginLeft: -12 }}
                        />
                    </View>
                )
            case CategoryFieldType.boolean:
                return (
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                        <Text style={machineStyles.fieldLabel}>{attr.key}: </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#2B7EFE" }}
                            onValueChange={value => handleAttributeChange({ ...attr, value })}
                            value={Boolean(value)}
                        />
                    </View>
                )
        }
    }, [machineState])

    return (
        <View style={{
            width: `100%`,
            backgroundColor: '#2B7EFE11',
            borderRadius: 12,
            padding: windowDimensions.width > 600 ? 20 : 12,
            gap: 10
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '400' }}>{String(machineState.attributes.find(attr => selectedCategory.titleField === attr.key)?.value || 'Unnamed Entity')}</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Button 
                        onPress={() => dispatch(deleteMachine(machineState.id))} 
                        style={{ ...machineStyles.iconButton, backgroundColor: 'hotpink' }}
                    >
                        <Ionicons name="trash-outline" size={18} color="white" />
                    </Button>
                    <Button onPress={() => setCollapsed(!isCollapsed)} style={{ ...machineStyles.iconButton, backgroundColor: '#2B7EFE' }}>
                        <Ionicons name="chevron-down" size={18} color="white" />
                    </Button>
                </View>
            </View>
            {
                !isCollapsed &&
                selectedCategory.fields.map(field => (
                    <View key={field.key} style={{ flexDirection: 'row', columnGap: 4 }}>
                        {
                            getAttributeComponent({ ...field, value: '' })
                        }
                    </View>
                ))
            }
        </View>
    )
}


const machineStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '500'
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 32,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderColor: '#2B7EFEcc',
        borderWidth: 1,
    },
    iconButton: {
        backgroundColor: 'hotpink',
        paddingHorizontal: 4,
        paddingVertical: 0,
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    fieldLabel: {
        textTransform: 'capitalize',
        width: 90
    }

})