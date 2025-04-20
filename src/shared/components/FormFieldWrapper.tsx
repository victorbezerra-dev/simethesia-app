import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type FormFieldWrapperProps = {
    icon?: React.ReactNode;
    label: string;
    description?: string;
    children: React.ReactNode;
};

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
    icon,
    label,
    description,
    children,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>{icon}</View>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.inputContainer}>{children}</View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create<{
    container: ViewStyle;
    iconContainer: ViewStyle;
    textContainer: ViewStyle;
    label: TextStyle;
    inputContainer: ViewStyle;
}>({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    iconContainer: {
        width: 40,
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginLeft: 0,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFFFFF',
    },
    inputContainer: {
        width: '100%',
        marginTop: 5,
        marginBottom: 4,
        alignItems: 'flex-start',
    },
});

export default FormFieldWrapper