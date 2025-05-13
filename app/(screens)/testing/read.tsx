import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedKeyboardAvoidingView } from '@/components/ThemedKeyboardAvoidingView';
import { ThemedView } from '@/components/ThemedView';

export default function ReadScreen() {
  return (
    <ThemedKeyboardAvoidingView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Read</ThemedText>
      </ThemedView>
    </ThemedKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
