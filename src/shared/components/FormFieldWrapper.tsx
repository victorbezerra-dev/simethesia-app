import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';

type FormFieldWrapperProps = {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
};

export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  icon,
  label,
  children,
  containerStyle,
  iconContainerStyle,
  textContainerStyle,
  labelStyle,
  inputContainerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.iconContainer, iconContainerStyle]}>{icon}</View>
      <View style={[styles.textContainer, textContainerStyle]}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {children}
        </View>
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

export default FormFieldWrapper;
