import { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, Platform, Appearance } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import * as ScreenOrientation from 'expo-screen-orientation';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import * as Speech from 'expo-speech';
import * as SQLite from 'expo-sqlite';
import { createClient } from 'webdav';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedKeyboardAvoidingView } from '@/components/ThemedKeyboardAvoidingView';
import { ThemedView } from '@/components/ThemedView';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export default function HomeScreen() {
  const [key, setKey] = useState('my-key');
  const [value, setValue] = useState('My value.');
  const [webdavResult, setWebdavResult] = useState('my result');
  const [orientation, setOrientation] = useState('unknown');
  const [keepAwake, setKeepAwake] = useState(false);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [voice, setVoice] = useState<Speech.Voice | undefined>();

  useEffect(() => {
    if (voices.length == 0) {
      Speech.getAvailableVoicesAsync().then((voices) => setVoices(voices));
    }
  }, [voices]);

  return (
    <ThemedKeyboardAvoidingView>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Secure Storage</ThemedText>
        </ThemedView>
        <ThemedView style={styles.partContainer}>
          <ThemedText style={styles.paragraph}>
            Save an item, and grab it later!
          </ThemedText>
          <ThemedTextInput
            onChangeText={(text: string) => {
              setKey(text);
            }}
            placeholder="Key"
            value={key}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
          />
          <ThemedTextInput
            onChangeText={(text: string) => {
              setValue(text);
            }}
            placeholder="Value"
            value={value}
          />
          <Button
            title="Retrieve the key's value"
            onPress={async () => {
              try {
                setValue((await getValueFor(key)) || '');
                alert('Retrieved');
              } catch (e: any) {
                alert('Error: ' + e);
              }
            }}
          />
          <Button
            title="Save this key/value pair"
            onPress={async () => {
              await save(key, value);
              alert('Saved');
            }}
          />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">WebDAV</ThemedText>
        </ThemedView>
        <ThemedView style={styles.partContainer}>
          <ThemedText>{webdavResult}</ThemedText>
          <Button
            title="Make WebDAV Request"
            onPress={async () => {
              const client = createClient('https://test.example.com/', {
                username: 'hperrin',
                password: 'password',
              });
              const directoryItems = await client.getDirectoryContents('/');
              setWebdavResult(JSON.stringify(directoryItems, null, 2));
            }}
          />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Orientation</ThemedText>
        </ThemedView>
        <ThemedView style={styles.partContainer}>
          <ThemedText>{orientation}</ThemedText>
          <Button
            title="Get Orientation"
            onPress={async () => {
              const ori = await ScreenOrientation.getOrientationAsync();
              setOrientation(
                [
                  'UNKNOWN',
                  'PORTRAIT_UP',
                  'PORTRAIT_DOWN',
                  'LANDSCAPE_LEFT',
                  'LANDSCAPE_RIGHT',
                ][ori],
              );
            }}
          />
          <Button
            title="Lock Current"
            onPress={async () => {
              await ScreenOrientation.lockAsync(
                [
                  ScreenOrientation.OrientationLock.DEFAULT,
                  ScreenOrientation.OrientationLock.PORTRAIT_UP,
                  ScreenOrientation.OrientationLock.PORTRAIT_DOWN,
                  ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
                  ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
                ][await ScreenOrientation.getOrientationAsync()],
              );
            }}
          />
          <Button
            title="Lock Portrait Up"
            onPress={async () => {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP,
              );
            }}
          />
          <Button
            title="Lock Portrait Down"
            onPress={async () => {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_DOWN,
              );
            }}
          />
          <Button
            title="Lock Landscape Right"
            onPress={async () => {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
              );
            }}
          />
          <Button
            title="Lock Landscape Left"
            onPress={async () => {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
              );
            }}
          />
          <Button
            title="Unlock"
            onPress={async () => {
              await ScreenOrientation.unlockAsync();
            }}
          />
          <Button
            title="Complete Unlock"
            onPress={async () => {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.ALL,
              );
            }}
          />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Keep Awake</ThemedText>
        </ThemedView>
        <ThemedView style={styles.partContainer}>
          <ThemedText>{keepAwake ? 'Active' : 'Inactive'}</ThemedText>
          <Button
            title="Activate"
            onPress={async () => {
              await activateKeepAwakeAsync('reading');
              setKeepAwake(true);
            }}
          />
          <Button
            title="Deactivate"
            onPress={async () => {
              await deactivateKeepAwake('reading');
              setKeepAwake(false);
            }}
          />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Text to Speech</ThemedText>
        </ThemedView>
        <ThemedView style={styles.partContainer}>
          <RNPickerSelect
            value={voice == null ? voice : voice.identifier}
            onValueChange={(itemValue, itemIndex) =>
              setVoice(voices.find((voice) => voice.identifier === itemValue))
            }
            items={voices.map((voice) => ({
              label: `${voice.name} (${voice.language}, ${voice.quality})`,
              value: voice.identifier,
            }))}
            darkTheme={Appearance.getColorScheme() === 'dark'}
          >
            <ThemedText>
              {voice == null ? 'None' : `${voice.name} (${voice.language})`}
            </ThemedText>
          </RNPickerSelect>
          <Button
            title="Speak"
            onPress={async () => {
              Speech.stop();
              const thingToSay = `This is how text to speech sounds with the ${voice == null ? 'default' : voice.name} voice.`;
              Speech.speak(thingToSay, {
                ...(voice == null ? {} : { voice: voice.identifier }),
              });
            }}
          />
          <Button
            title="Stop"
            onPress={async () => {
              Speech.stop();
            }}
          />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">SQLite</ThemedText>
        </ThemedView>
        <ThemedView style={styles.partContainer}>
          <Button
            title="Do a SQLite Thing"
            onPress={async () => {
              const db = await SQLite.openDatabaseAsync('databaseName');

              // `execAsync()` is useful for bulk queries when you want to execute altogether.
              // Note that `execAsync()` does not escape parameters and may lead to SQL injection.
              await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
INSERT INTO test (value, intValue) VALUES ('test1', 123);
INSERT INTO test (value, intValue) VALUES ('test2', 456);
INSERT INTO test (value, intValue) VALUES ('test3', 789);
`);

              // `runAsync()` is useful when you want to execute some write operations.
              const result = await db.runAsync(
                'INSERT INTO test (value, intValue) VALUES (?, ?)',
                'aaa',
                100,
              );
              console.log(result.lastInsertRowId, result.changes);
              await db.runAsync(
                'UPDATE test SET intValue = ? WHERE value = ?',
                999,
                'aaa',
              ); // Binding unnamed parameters from variadic arguments
              await db.runAsync(
                'UPDATE test SET intValue = ? WHERE value = ?',
                [999, 'aaa'],
              ); // Binding unnamed parameters from array
              await db.runAsync('DELETE FROM test WHERE value = $value', {
                $value: 'aaa',
              }); // Binding named parameters from object

              // `getFirstAsync()` is useful when you want to get a single row from the database.
              const firstRow = await db.getFirstAsync<{
                id: number;
                value: string;
                intValue: number;
              }>('SELECT * FROM test');
              alert('getFirstAsync: ' + JSON.stringify(firstRow, null, 2));

              // `getAllAsync()` is useful when you want to get all results as an array of objects.
              const allRows = await db.getAllAsync<{
                id: number;
                value: string;
                intValue: number;
              }>('SELECT * FROM test');
              for (const row of allRows) {
                alert('getAllAsync: ' + JSON.stringify(row, null, 2));
              }

              // `getEachAsync()` is useful when you want to iterate SQLite query cursor.
              for await (const row of db.getEachAsync<{
                id: number;
                value: string;
                intValue: number;
              }>('SELECT * FROM test')) {
                alert('getEachAsync: ' + JSON.stringify(row, null, 2));
              }
            }}
          />
        </ThemedView>
      </ParallaxScrollView>
    </ThemedKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  partContainer: {
    gap: 8,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
