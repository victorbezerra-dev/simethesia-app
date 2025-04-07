import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  onDataChange: (data: any) => void;
};

export default function ChallengesSection({ onDataChange }: Props) {
  React.useEffect(() => {
    onDataChange({ dummy: 'settingsData' });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Desafios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0a0a0a',
  },
});
