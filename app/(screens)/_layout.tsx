import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.drawerScrollView}
          >
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Dryad Reader</ThemedText>
            </ThemedView>
            <DrawerItemList {...props} />
            <View style={styles.actionsContainer}>
              <DrawerItem
                label="App Settings"
                icon={(props) => (
                  <IconSymbol name="gearshape.fill" {...props} />
                )}
                focused={
                  props.state.routes[props.state.index].name ===
                  'settings/index'
                }
                onPress={() => props.navigation.navigate('settings/index')}
              />
            </View>
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            headerShown: true,
            drawerIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="libraries/index"
          options={{
            drawerLabel: 'Libraries',
            title: 'Libraries',
            headerShown: true,
            drawerIcon: (props) => (
              <IconSymbol name="books.vertical.fill" {...props} />
            ),
          }}
        />
        <Drawer.Screen
          name="testing"
          options={{
            drawerLabel: 'Testing',
            title: 'Testing',
            headerShown: true,
            drawerIcon: (props) => <IconSymbol name="testtube.2" {...props} />,
          }}
        />
        <Drawer.Screen
          name="settings/index"
          options={{
            title: 'Settings',
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerScrollView: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  titleContainer: {
    paddingInline: 15,
    marginBlockEnd: 25,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
});
