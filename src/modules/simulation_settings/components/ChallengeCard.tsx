import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Challenge } from '@/shared/models/Challenge';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Gesture } from 'react-native-gesture-handler';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import SwipeToDeleteRow from '@/shared/components/SwipeToDeleteWrapper';

type Props = {
    item: Challenge;
    drag: () => void;
    isActive: boolean;
    onDelete: () => void;
};

const ChallengeCard = ({ item, drag, isActive, onDelete }: Props) => {
    const dragGesture = useMemo(
        () =>
            Gesture.LongPress()
                .maxDistance(400)
                .minDuration(100)
                .onStart(() => {
                    drag();
                }),
        [drag]
    );

    return (
        <View style={{marginBottom: 12}}>
            <ScaleDecorator activeScale={1.05}>
                <SwipeToDeleteRow onDelete={onDelete} externalGesture={dragGesture}>
                    <TouchableOpacity
                        onLongPress={drag}
                        disabled={isActive}
                        style={[styles.card, isActive && styles.activeCard]}
                    >
                        <Image source={item.effect.icon} style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.effect.label}</Text>
                            <Text style={styles.description}>
                                <Text style={styles.underline}>Efeito simulado:</Text>{' '}
                                {item.effect.description}
                            </Text>
                            <Text style={styles.description}>
                                <Text style={styles.underline}>Tempo:</Text>{' '}
                                {item.durationInSeconds} segundos
                            </Text>
                        </View>
                        <View style={styles.dragHandle}>
                            <MaterialCommunityIcons
                                name="drag-vertical"
                                size={24}
                                color="#999"
                            />
                        </View>
                    </TouchableOpacity>
                </SwipeToDeleteRow>
            </ScaleDecorator>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        borderRadius: 20,
        padding: 16,
    },
    activeCard: {
        backgroundColor: '#334155',
        opacity: 0.9,
    },
    icon: {
        width: 36,
        height: 36,
        marginRight: 8,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 18,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    dragHandle: {
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChallengeCard;