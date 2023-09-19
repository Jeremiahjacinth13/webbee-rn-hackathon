import * as React from 'react'
import { View, Text, SafeAreaView, ScrollView, SectionList } from 'react-native'
import { useAppSelector, useListColumn } from '../hooks'
import { MachineListHeader } from '../components'
import Machine from '../components/ui/machine'

export default function DashboardScreen() {
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
        <SafeAreaView style={{ backgroundColor: 'white' }}>
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
                        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>No category added</Text>
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}