import * as React from 'react'
import { Dimensions, ScaledSize, useWindowDimensions } from 'react-native'

const useListColumn = <T>({ mobile, tab }: { mobile: T, tab: T }) => {
    const [dimensions, setDimensions] = React.useState<ScaledSize>(Dimensions.get('screen'))
    const [colCount, setColCount] = React.useState(dimensions.width > 700 ? tab : dimensions.height < dimensions.width ? tab : mobile)

    React.useEffect(() => {
        Dimensions.addEventListener('change', () => {
            console.log(
                'dimensions has changed'
            )
            setDimensions(Dimensions.get('window'))
            setColCount(dimensions.width > 700 ? tab : dimensions.height < dimensions.width ? tab : mobile)
        });

        // should remove listener here
    }, [])

    return colCount
}

export default useListColumn;