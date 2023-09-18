import * as React from 'react'
import { StyleSheet } from 'react-native'
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown'

interface SelectProps<T> {
    options: T[],
    defaultValue?: T,
    onChange: (val: T) => void,
    buttonStyle?: SelectDropdownProps['buttonStyle'],
}


export default function Select<T>({ onChange, defaultValue, options, buttonStyle }: SelectProps<T>) {
    return (
        <SelectDropdown
            defaultValue={defaultValue}
            data={options}
            onSelect={(selectedItem) => {
                onChange(selectedItem)
            }}
            buttonStyle={StyleSheet.flatten([{
                backgroundColor: '#FFFFFF',
                width: 80,
                height: 32,
                borderRadius: 8,
                borderColor: '#2B7EFEcc',
                borderWidth: 1,
                paddingHorizontal: 0,
            }, buttonStyle])}
            dropdownStyle={{
                borderRadius: 8,
                marginTop: 2,
                paddingVertical: 10,
                height: 150
            }}
            rowStyle={{
                height: 32,
            }}
            selectedRowStyle={{
                backgroundColor: '#2B7EFE'
            }}
            selectedRowTextStyle={{
                color: 'white'
            }}
            rowTextStyle={{
                textAlign: 'left',
                fontSize: 14
            }}
            buttonTextStyle={{
                fontSize: 14,
                textAlign: 'left'
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
    )
}

