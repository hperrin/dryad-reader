import { StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ThemedScrollView from '@/components/ThemedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedKeyboardAvoidingView } from '@/components/ThemedKeyboardAvoidingView';

export default function IndexScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      drawerLabel: 'Libraries',
      title: 'Libraries',
      headerShown: true,
    });
  }, [navigation]);

  return (
    <ThemedKeyboardAvoidingView>
      <ThemedScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
      </ThemedScrollView>
    </ThemedKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
