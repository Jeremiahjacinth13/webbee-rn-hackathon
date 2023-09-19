import * as React from 'react'
import { TouchableOpacityProps, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    hasTextHasDirectChild?: boolean,
    children: React.ReactNode
}

export default function Button({ children, style, hasTextHasDirectChild = true, ...otherProps }: ButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={StyleSheet.flatten([pressableStyle.base, style])} {...otherProps}>
            {hasTextHasDirectChild ? <Text style={{ color: 'white' }}>{children}</Text> : children}
        </TouchableOpacity>
    )
}

const pressableStyle = StyleSheet.create({
    base: {
        backgroundColor: '#2B7EFE',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    }
})