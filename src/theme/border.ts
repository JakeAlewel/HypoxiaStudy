import {ImageStyle, ViewStyle} from 'react-native';
import {Colors} from './colors';

export const bordered: ViewStyle & ImageStyle = {
  borderWidth: 1,
  borderRadius: 8,
  borderColor: Colors.DarkBlue,
  padding: 8,
};
