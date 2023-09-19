import * as React from 'react'
import { View, Text, ListRenderItem, FlatList, StyleSheet } from 'react-native'
import { useAppDispatch, useAppSelector, useListColumn } from '../hooks'
import { Button, Category } from '../components'
import { createCategory } from '../store/categorySlice'
import { Category as TCategory } from '../types'
import { getDefaultCategory } from '../utils'

export default function CategoryScreen() {

    const { categories } = useAppSelector(store => store.categories)
    const columnCount = useListColumn({ mobile: 1, tab: 2 })
    const dispatch = useAppDispatch()

    const _renderItem: ListRenderItem<TCategory> = ({ item, index }) => {
        return (
            <View style={{ width: `${(100/columnCount)}%`, paddingRight: columnCount > 1 ? index % 2 === 1 ? 0 : 12 : 0, paddingLeft: columnCount > 1 ? index % 2 === 1 ? 12 : 0 : 0}}>
                <Category {...item} />
            </View>
        )
    }

    return (
        <>
            <FlatList
                key={columnCount}
                contentContainerStyle={{ padding: 16, gap: 24 }}
                data={categories}
                renderItem={_renderItem}
                keyExtractor={(item) => item.id}
                numColumns={columnCount}
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <Text style={{ fontSize: 24, fontWeight: '500' }}>Add Category</Text>
                        <Button
                            style={styles.iconButton}
                            onPress={() => dispatch(createCategory(getDefaultCategory()))}
                        > +
                        </Button>
                    </View>
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        width: 32,
        height: 32,
        paddingHorizontal: 0,
        paddingVertical: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})