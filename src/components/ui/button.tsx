import * as React from 'react'
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface ButtonProps extends PressableProps {
    hasTextHasDirectChild?: boolean,
    children: React.ReactNode
}

export default function Button({ children, style, hasTextHasDirectChild = true, ...otherProps }: ButtonProps) {
    return (
        <Pressable style={StyleSheet.flatten([pressableStyle.base, style])} {...otherProps}>
            {hasTextHasDirectChild ? <Text style={{ color: 'white' }}>{children}</Text> : children}
        </Pressable>
    )
}

const pressableStyle = StyleSheet.create({
    base: {
        backgroundColor: '#2B7EFE',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 12,
    }
})