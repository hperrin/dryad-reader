import {
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedKeyboardAvoidingViewProps = KeyboardAvoidingViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedKeyboardAvoidingView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedKeyboardAvoidingViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return (
    <KeyboardAvoidingView
      style={[{ backgroundColor, flex: 1 }, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...otherProps}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {otherProps.children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
