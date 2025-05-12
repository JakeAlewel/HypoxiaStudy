import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {Colors} from '../../theme/colors';

export const TargetButtonSize = 68;

export interface TargetButtonProps {
  enabled: boolean;
  style?: ViewStyle;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

export function TargetButton({enabled, onPressIn, onPressOut, style}: TargetButtonProps): React.ReactElement {
  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({pressed}) => ({
        width: TargetButtonSize,
        height: TargetButtonSize,
        borderRadius: TargetButtonSize / 2,
        borderWidth: 8,
        borderColor: Colors.DarkBlue,
        backgroundColor: pressed ? Colors.Orange : enabled ? Colors.Blue : Colors.White,
        ...StyleSheet.absoluteFillObject,
        ...style,
      })}
    />
  );
}
