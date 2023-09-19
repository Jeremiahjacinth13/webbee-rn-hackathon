import * as React from 'react'
import { View, Text, ListRenderItem, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { useAppDispatch, useAppSelector, useListColumn } from '../hooks'
import { Button, Category } from '../components'
import { createCategory } from '../store/categorySlice'
import { Category as TCategory } from '../types'
import { getDefaultCategory } from '../utils'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CategoryScreen() {

    const { categories } = useAppSelector(store => store.categories)
    const columnCount = useListColumn({ mobile: 1, tab: 2 })
    const dispatch = useAppDispatch()

    const _renderItem: ListRenderItem<TCategory> = ({ item, index }) => {
        return (
            <View style={{ width: `${(100 / columnCount)}%`, paddingRight: columnCount > 1 ? index % 2 === 1 ? 0 : 12 : 0, paddingLeft: columnCount > 1 ? index % 2 === 1 ? 12 : 0 : 0 }}>
                <Category {...item} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                key={columnCount}
                contentContainerStyle={{ padding: 12, gap: columnCount > 1 ? 24 : 8, backgroundColor: 'white' }}
                data={categories}
                renderItem={_renderItem}
                keyExtractor={(item) => item.id}
                numColumns={columnCount}
                ListEmptyComponent={() => (
                    <View style={{ height: 120, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center' }}>No category added</Text>
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Add Category</Text>
                        <Button
                            style={styles.iconButton}
                            onPress={() => dispatch(createCategory(getDefaultCategory()))}
                        >
                            <Ionicons name="add" size={20} color="white" />
                        </Button>
                    </View>
                )}
            />
        </SafeAreaView>
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
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})