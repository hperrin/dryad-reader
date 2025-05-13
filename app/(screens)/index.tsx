import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
// import { useNavigation } from 'expo-router';
// import { DrawerNavigationOptions } from '@react-navigation/drawer';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { IconSymbol } from '@/components/ui/IconSymbol';

function currentDayFormat() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format();
}

export default function IndexScreen() {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     drawerLabel: 'Home',
  //     title: 'Home',
  //     headerShown: true,
  //     drawerIcon: ({ color }) => (
  //       <IconSymbol size={28} name="house.fill" color={color} />
  //     ),
  //   } as DrawerNavigationOptions);
  // }, [navigation]);

  const [title, setTitle] = useState(currentDayFormat());

  useEffect(() => {
    const interval = setInterval(() => {
      setTitle(currentDayFormat());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <ThemedText
          type="title"
          lightColor="#404040"
          darkColor="#A0A0A0"
          style={styles.headerText}
        >
          {title}
        </ThemedText>
      }
      headerHeight={120}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    bottom: 10,
    left: 10,
    position: 'absolute',
    fontSize: 48,
    lineHeight: 48,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
