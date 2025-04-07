import React from 'react';
import { View, TouchableOpacity, Animated,  useWindowDimensions } from 'react-native';

const tabs = ['Paciente', 'Desafios'];

type Props = {
  scrollX: Animated.Value;
  onTabChange: (index: number) => void;
};

export default function CustomTabBar({ scrollX, onTabChange }: Props) {
  const { width } = useWindowDimensions();

  const inputRange = tabs.map((_, i) => i * width);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#062342',
        borderRadius: 999,
        padding: 8,
        marginBottom: 12,
      }}
    >
      {tabs.map((tab, index) => {

        const outputColors = tabs.map((_, i) =>
          i === index ? '#093361' : '#062342'
        );
        const outputTextColors = tabs.map((_, i) =>
          i === index ? '#fff' : '#E0F7FF'
        );

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: outputColors,
        });

        const textColor = scrollX.interpolate({
          inputRange,
          outputRange: outputTextColors,
        });

        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(index)}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Animated.View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 35,
                borderRadius: 20,
                backgroundColor,
              }}
            >
              <Animated.Text
                style={{
                  fontWeight: 'bold',
                  color: textColor,
                }}
              >
                {tab}
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
