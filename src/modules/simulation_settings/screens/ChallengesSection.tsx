import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList, { RenderItem } from 'react-native-draggable-flatlist';
import { Challenge } from '@/shared/models/Challenge';
import { useChallengeStore } from '../stores/useChallengeStore';
import ChallengeCard from '../components/ChallengeCard';
import { useNavigation } from '@react-navigation/native';

export default function ChallengesSection() {
  const navigation = useNavigation();
  const challenges = useChallengeStore(state => state.challenges);
  const setReordered = useChallengeStore(state => state.setReordered);

  const renderItem: RenderItem<Challenge> = useCallback(
    ({ item, drag, isActive }) => (
      <ChallengeCard item={item} drag={drag} isActive={isActive} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <DraggableFlatList<Challenge>
        data={challenges}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={renderItem}
        onDragEnd={({ data }) => setReordered(data)}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              (navigation as any).navigate("AddNewChallenge")
            }}
          >
            <Text style={styles.addButtonText}>+ Novo Desafio</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,           
  },
  listContent: {
    padding: 6,       
    paddingBottom: 80, 
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  effect: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  addButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#3E6DFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#3E6DFF',
    fontWeight: '400',
    fontSize: 16,
  },
});
