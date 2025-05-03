import {
  Picker,
  PickerProps,
  PickerItemProps,
} from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

// Why doesn't this component work?

export type ThemedPickerProps = PickerProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedPicker({
  lightColor,
  darkColor,
  ...rest
}: ThemedPickerProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <Picker selectionColor={color} {...rest} />;
}

export type ThemedPickerItemProps = PickerItemProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'defaultSemiBold';
};

ThemedPicker.Item = function ThemedPickerItem({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedPickerItemProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Picker.Item
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        style,
      ]}
      color={color}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});
