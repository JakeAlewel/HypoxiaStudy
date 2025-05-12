import {Pressable, Text, View} from 'react-native';
import {Colors} from '../../theme/colors';

export const MarkerSize = 48;

export interface TrailMarkerProps {
  onPress: () => void;
  index: number;
  targetIndex: number;
  position: {
    top: number;
    left: number;
  };
}

export function TrailMarker({onPress, index, targetIndex, position}: TrailMarkerProps): React.ReactElement {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: MarkerSize,
        height: MarkerSize,
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        top: position.top - MarkerSize / 2,
        left: position.left - MarkerSize / 2,
      }}>
      <View
        style={{
          borderWidth: 1,
          width: MarkerSize * 0.75,
          height: MarkerSize * 0.75,
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: MarkerSize / 2,
          borderColor: Colors.DarkBlue,
          backgroundColor: index < targetIndex ? Colors.Blue : Colors.White,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 600,
            color: index < targetIndex ? Colors.White : Colors.DarkBlue,
          }}>
          {index + 1}
        </Text>
      </View>
    </Pressable>
  );
}
