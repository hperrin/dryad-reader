import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="index" />
        <Drawer.Screen
          name="libraries/index"
          options={{
            drawerLabel: 'Libraries',
            title: 'Libraries',
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="testing"
          options={{
            drawerLabel: 'Testing',
            title: 'Testing',
            headerShown: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
