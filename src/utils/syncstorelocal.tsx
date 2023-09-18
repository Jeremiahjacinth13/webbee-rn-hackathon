import * as React from 'react'
import { useAppSelector } from '../hooks'
import * as AsyncStorage from '@react-native-async-storage/async-storage'

export default function SyncStoreLocal({ children }: { children: React.ReactNode }) {
    const store = useAppSelector(store => store)

    React.useEffect(() => {
        console.log('store changed')
    }, [store])

    return (
        <>
            {children}
        </>
    )
}