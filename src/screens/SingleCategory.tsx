import * as React from 'react';
import { View, Text } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useAppSelector } from '../hooks';

interface ScreenProps {
    navigation: NavigationProp<any, any>
    route: RouteProp<any, any>
}

export default function SingleCategory(props: ScreenProps) {
    const { categories } = useAppSelector(store => store.categories)
    const selectedCategory = categories.find(category => category.id === props.route.name)

    return (
        <View>
            <Text>{JSON.stringify(selectedCategory, null, 3)}</Text>
        </View>
    )
}
