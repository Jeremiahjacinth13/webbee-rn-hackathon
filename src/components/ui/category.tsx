import * as React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { CategoryFieldType, Category as TCategory } from '../../types'
import Divider from './divider'
import FieldTypeSelect from './fieldtypeselect'
import Button from './button'
import { generateRandomUUID } from '../../utils'
import { deleteCategory, editCategory } from '../../store/categorySlice'
import { useAppDispatch } from '../../hooks'

export default function Category(props: TCategory) {

    const [categoryState, setCategoryState] = React.useState<TCategory>(props)
    const [isCollapsed, setCollapsed] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()


    React.useEffect(() => {
        dispatch(editCategory(categoryState))
    }, [categoryState])

    const handleFieldChange = React.useCallback((id: string, key: string, value: string) => {
        setCategoryState(oldCategory => {
            const fields = [...oldCategory.fields]
            const index = fields.findIndex(field => field.id === id)

            fields[index] = { ...fields[index], [key]: value }
            return { ...oldCategory, fields }
        })
    }, [])

    const removeField = React.useCallback((id: string) => {
        setCategoryState(oldCategory => {
            const fields = [...oldCategory.fields]
            const index = fields.findIndex(field => field.id === id)
            fields.splice(index, 1)

            return { ...oldCategory, fields }
        })
    }, [])

    if (isCollapsed) {
        return (
            <View style={{
                width: `100%`,
                backgroundColor: '#2B7EFE11',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={{ gap: 10 }}>
                    <Text style={categoryStyles.title}>Title: {categoryState.name || ' '}</Text>
                    <Text>Number of fields: {categoryState.fields.length}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Button
                        style={{ ...categoryStyles.iconButton, backgroundColor: 'hotpink' }}
                        onPress={() => dispatch(deleteCategory(categoryState.id))}
                    >
                        Delete
                    </Button>
                    <Button
                        style={{ ...categoryStyles.iconButton, backgroundColor: '#2B7EFE' }}
                        onPress={() => setCollapsed(false)}
                    >
                        Edit
                    </Button>
                </View>
            </View>
        )
    }

    return (
        <View style={{
            width: `100%`,
            backgroundColor: '#2B7EFE11',
            borderRadius: 12,
            padding: 16,
            gap: 10
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={categoryStyles.title}>{categoryState.name || ' '}</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Button onPress={() => dispatch(deleteCategory(categoryState.id))} style={{ ...categoryStyles.iconButton, backgroundColor: 'hotpink' }}>Delete</Button>
                    <Button onPress={() => setCollapsed(true)} style={{ ...categoryStyles.iconButton, backgroundColor: '#2B7EFE' }}>Collapse</Button>
                </View>
            </View>

            <TextInput
                style={categoryStyles.textInput}
                onChangeText={(text) => setCategoryState({ ...categoryState, name: text })}
                placeholder='Category Name'
                value={categoryState.name}
            />

            <Divider style={{ height: 1, backgroundColor: '#FFFFFFef', marginVertical: 4 }} />

            <Text>Fields: </Text>

            {categoryState.fields.map(field => (
                <View key={field.id} style={{ flexDirection: 'row', columnGap: 4 }}>
                    <FieldTypeSelect onChange={(newValue) => handleFieldChange(field.id, 'type', newValue)} />
                    <TextInput
                        autoCapitalize='none'
                        style={{ ...categoryStyles.textInput, flex: 2 }}
                        onChangeText={(text) => handleFieldChange(field.id, 'key', text)}
                        placeholder='Field'
                        value={field.key}
                    />
                    <Button style={categoryStyles.iconButton} onPress={() => removeField(field.id)}>
                        <Text style={{ fontSize: 12 }}>Remove</Text>
                    </Button>
                </View>
            ))}

            <Button onPress={() => setCategoryState({ ...categoryState, fields: [...categoryState.fields, { key: "", type: CategoryFieldType.text, id: generateRandomUUID() }] })}>Add New Field</Button>
        </View>
    )
}

const categoryStyles = StyleSheet.create({
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    }
})