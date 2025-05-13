import {
  StyleSheet,
  Button,
  View,
  Modal,
  Text,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system'; // for Expo project
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemedText } from '@/components/ThemedText';
import { ThemedKeyboardAvoidingView } from '@/components/ThemedKeyboardAvoidingView';
import { ThemedView } from '@/components/ThemedView';

export default function ReadScreen() {
  const { theme, goToLocation } = useReader();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [safeArea, setSafeArea] = useState(true);

  return (
    <GestureHandlerRootView>
      <Modal visible={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.body.background,
            ...(safeArea
              ? {
                  paddingTop: insets.top,
                  paddingBottom: insets.bottom,
                  paddingLeft: insets.left,
                  paddingRight: insets.right,
                }
              : {}),
          }}
        >
          <Reader
            src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
            fileSystem={useFileSystem}
            allowScriptedContent={false}
            width={width}
            onLongPress={() => setSafeArea(!safeArea)}
          />
          <View
            style={{
              ...styles.actionContainer,
              backgroundColor: theme.body.background,
            }}
          >
            <Button
              title={safeArea ? 'Full Screen' : 'Safe Margins'}
              onPress={() => {
                setSafeArea(!safeArea);
              }}
              color={theme.a.color}
            />
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
