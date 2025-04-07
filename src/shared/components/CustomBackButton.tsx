import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomBackButton() {
  const navigation = useNavigation();

  if (!navigation.canGoBack()) return null;

  return (
    <TouchableOpacity onPressOut={() => navigation.goBack()} 
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>

      <Ionicons name="arrow-back" size={30} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
});
