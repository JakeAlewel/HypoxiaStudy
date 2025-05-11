import {PressableStateCallbackType, ViewStyle} from 'react-native';
import {Colors} from './colors';

export const createPressableStyles =
  (overrides?: ViewStyle) =>
  ({pressed}: PressableStateCallbackType) => ({
    padding: 16,
    ...overrides,
    backgroundColor: pressed ? Colors.LightGray : overrides?.backgroundColor ?? 'transparent',
  });
