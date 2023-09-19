import { useWindowDimensions } from 'react-native'

const useListColumn = <T>({ mobile, tab }: { mobile: T, tab: T }): T => {
    const dimensions = useWindowDimensions()

    if (dimensions.width > 700) {
        return tab
    } else if (dimensions.height < dimensions.width) {
        return tab
    } else {
        return mobile
    }
}

export default useListColumn;