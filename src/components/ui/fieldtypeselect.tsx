import SelectDropdown from 'react-native-select-dropdown'
import { CategoryFieldType } from '../../types'
import { View } from 'react-native'


const options: CategoryFieldType[] = [
    CategoryFieldType.boolean,
    CategoryFieldType.date,
    CategoryFieldType.number,
    CategoryFieldType.text
]


export default function FieldTypeSelect({ onChange }: { onChange: (val: string) => void }) {
    return (
        <SelectDropdown
            defaultValue={CategoryFieldType.text}
            data={options}
            onSelect={(selectedItem, index) => {
                onChange(selectedItem)
            }}
            buttonStyle={{
                backgroundColor: '#FFFFFF',
                width: 80,
                height: 32,
                borderRadius: 8,
                borderColor: '#2B7EFEcc',
                borderWidth: 1,
                paddingHorizontal: 0,
            }}
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

