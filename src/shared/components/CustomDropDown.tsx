import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View } from 'react-native';
import { FormFieldWrapper } from './FormFieldWrapper';

type CustomDropdownProps = {
    label: string;
    icon?: React.ReactNode;
    value: string | null;
    onChange: (val: string) => void;
    options: string[];
};

const CustomDropdown = ({
    label,
    icon,
    value,
    onChange,
    options,
}: CustomDropdownProps) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        options.map((opt) => ({ label: opt, value: opt }))
    );

    return (
        <FormFieldWrapper icon={icon} label={label}>
            <View style={{ zIndex: 1000, minWidth: 140 }}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={(newValue) => {
                        const finalValue = typeof newValue === 'function' ? newValue(value) : newValue;
                        onChange(finalValue);
                    }}
                    setItems={setItems}
                    placeholder="Selecione"
                    style={{  height: 40, borderWidth: 0, backgroundColor: 'transparent' }}
                    textStyle={{
                        color: '#BFC4C9',
                        fontSize: 13,
                    }}
                    listItemLabelStyle={{
                        color: 'black',
                    }}
                    arrowIconStyle={{ tintColor: '#FFFFFF' } as any}
                    dropDownContainerStyle={{ borderRadius: 8 }}
                />
            </View>
        </FormFieldWrapper>
    );
};

export default CustomDropdown;
