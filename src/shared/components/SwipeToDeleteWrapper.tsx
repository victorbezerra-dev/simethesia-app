import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureType } from 'react-native-gesture-handler';

interface Props {
  children: React.ReactNode;
  onDelete: () => void;
  externalGesture?: GestureType;
}

export default function SwipeToDeleteRow({ children, onDelete, externalGesture }: Props) {
  const translateX = useSharedValue(0);
  const MAX_TRANSLATE = -100;
  const [rowHeight, setRowHeight] = useState(0);

  let panGesture = Gesture.Pan()
    .failOffsetY([-10, 10])
    .minDistance(10)
    .onUpdate((event) => {
      translateX.value = Math.max(MAX_TRANSLATE, Math.min(0, event.translationX));
    })
    .onEnd(() => {
      translateX.value =
        translateX.value < MAX_TRANSLATE / 2
          ? withSpring(MAX_TRANSLATE)
          : withSpring(0);
    });

  if (externalGesture) {
    panGesture = panGesture.simultaneousWithExternalGesture(externalGesture);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, 10],
      [0, 1],
      'clamp'
    );
    return { opacity };
  });

  const handleDelete = () => {
      runOnJS(onDelete)();
  };

  const onMeasuredLayout = (event: LayoutChangeEvent) => {
    setRowHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={[styles.wrapper, { height: rowHeight, borderRadius: 20 }]}>
      <Animated.View
        style={[
          styles.deleteButtonContainer,
          { height: rowHeight, borderRadius: 20 },
          deleteButtonStyle,
        ]}
      >
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.measurer} onLayout={onMeasuredLayout}>
        {children}
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.animatedRow,
            animatedStyle,
            { height: rowHeight, borderRadius: 20 },
          ]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  animatedRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  deleteButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 100,
    backgroundColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  measurer: {
    opacity: 0,
    position: 'absolute',
  },
});
