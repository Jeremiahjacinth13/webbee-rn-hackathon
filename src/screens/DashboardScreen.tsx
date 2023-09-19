import * as React from 'react'
import { View, Text, SafeAreaView, ScrollView, SectionList, Dimensions } from 'react-native'
import { useAppSelector, useListColumn } from '../hooks'
import { Button, MachineListHeader } from '../components'
import Machine from '../components/ui/machine'
import { NavigationProp } from '@react-navigation/native'

export default function DashboardScreen({ navigation } : { navigation: NavigationProp<any, any>}) {
    const { machines } = useAppSelector(store => store.machines)
    const columnCount = useListColumn({ mobile: 1, tab: 2 })
    const { categories } = useAppSelector(store => store.categories)

    const processedData = React.useMemo(() => {
        return categories.map(category => ({
            category,
            data: machines.filter(machine => machine.typeId === category.id)
        }))
    }, [categories, machines])

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView style={{ padding: 16 }}>
                {
                    processedData.map(data => (
                        <View key={data.category.id} style={{ marginBottom: 30 }}>
                            <MachineListHeader {...data.category} />
                            <View style={{ marginVertical: 12, gap: 8 }}>
                                {data.data.length === 0 && (
                                    <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center' }}>No {data.category.name} added</Text>
                                    </View>)
                                }

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {data.data.map((machine, index) => (
                                        <View
                                            key={machine.id}
                                            style={{
                                                width: `${100 / columnCount}%`,
                                                marginBottom: 10,
                                                paddingRight: columnCount > 1 ? index % 2 === 0 ? 10 : 0 : 0,
                                                paddingLeft: columnCount > 1 ? index % 2 === 1 ? 10 : 0 : 0
                                            }}>
                                            <Machine {...machine} />
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    ))
                }

                {
                    processedData.length === 0 && (
                        <View style={{ height: Dimensions.get('window').height - 200, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                            <Text style={{ textAlign: 'center', fontSize: 24 }}>No category added</Text>
                            <Button onPress={() => navigation.navigate('Categories')}>Go to categories</Button>
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}