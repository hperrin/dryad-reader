import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ThemedScrollView from '@/components/ThemedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedKeyboardAvoidingView } from '@/components/ThemedKeyboardAvoidingView';

export default function SettingsScreen() {
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
