import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FormFieldWrapper } from './FormFieldWrapper';

type ItemOption = { label: string; value: string; description?: string };

type CustomDropdownProps = {
  label: string;
  icon?: React.ReactNode;
  value: string | null;
  onChange: (val: string) => void;
  options: ItemOption[];
  customRenderItem?: (item: ItemOption, isSelected: boolean) => React.ReactNode;
  customRenderLabel?: (item: ItemOption) => React.ReactNode;
};

export const CustomDropdown = ({
  label,
  icon,
  value,
  onChange,
  options,
  customRenderItem,
  customRenderLabel,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const selectedItem = options.find(opt => opt.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  return (
    <FormFieldWrapper
      icon={icon}
      label={label}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(prev => !prev)}
        activeOpacity={0.7}
      >
        <View style={styles.buttonContent}>
          <View style={{ flex: 1 }}>
            {selectedItem ? (
              customRenderLabel
                ? customRenderLabel(selectedItem)
                : (
                  <Text style={styles.selectedText}>
                    {selectedItem.label}
                  </Text>
                )
            ) : (
              <Text style={styles.placeholderText}>Selecione</Text>
            )}
          </View>
          <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} color="#BFC4C9" />
        </View>
      </TouchableOpacity>

      {open && (
        <Animated.View style={[styles.dropdown, { opacity: opacityAnim }]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const isSelected = item.value === value;
              return (
                <TouchableOpacity
                  style={[styles.item, isSelected && styles.selectedItem]}
                  onPress={() => handleSelect(item.value)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemContent}>
                    {customRenderItem
                      ? customRenderItem(item, isSelected)
                      : (
                        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
                          {item.label}
                        </Text>
                      )}
                    {isSelected && (
                      <Ionicons name="checkmark-outline" size={18} color="#007AFF" style={{ marginLeft: 8 }} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: '#E0E0E0', marginHorizontal: 12 }} />
            )}
          />
        </Animated.View>
      )}
    </FormFieldWrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingTop: 5,
    backgroundColor: 'transparent',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  placeholderText: {
    color: '#BFC4C9',
    fontSize: 14,
  },
  selectedText: {
    color: '#BFC4C9',
    fontSize: 14,
    fontWeight: '600',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 10,
    marginTop: 1,
    borderWidth: 1,
    borderColor: '#BFC4C9',
    borderRadius: 8,
    backgroundColor: '#fff',
    maxHeight: 600,
    overflow: 'hidden',
    paddingVertical: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedItem: {
    backgroundColor: '#e6f7ff',
  },
  itemText: {
    color: '#333',
    fontSize: 14,
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
