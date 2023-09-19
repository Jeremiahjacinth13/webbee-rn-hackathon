import { StyleSheet, View, ViewProps } from "react-native";

interface DividerProps extends ViewProps { }

export default function Divider(props: DividerProps) {
    return (
        <View style={StyleSheet.flatten([{ height: 1, width: '100%', backgroundColor: '#33333312' }, props.style])} />
    )
}