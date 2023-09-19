import * as React from 'react'
import { Dimensions, ScaledSize, useWindowDimensions } from 'react-native'

const useListColumn = <T>({ mobile, tab }: { mobile: T, tab: T }): T => {
    // const [dimensions, setDimensions] = React.useState<ScaledSize>(Dimensions.get('screen'))
    // const [colCount, setColCount] = React.useState(dimensions.width > 700 ? tab : dimensions.height < dimensions.width ? tab : mobile)
    const dimensions= useWindowDimensions()

    React.useEffect(() => {
        // Dimensions.addEventListener('change', () => {
        //     console.log(
        //         'dimensions has changed'
        //     )
        //     setDimensions(Dimensions.get('window'))
        //     setColCount(dimensions.width > 700 ? tab : dimensions.height < dimensions.width ? tab : mobile)
        // });

        // should remove listener here
        console.log('Dim has changed')
        console.log(dimensions)

    }, [dimensions])

    if (dimensions.width > 700) {
        return tab
    } else if (dimensions.height < dimensions.width) {
        return tab
    } else {
        return mobile
    }
}

export default useListColumn;