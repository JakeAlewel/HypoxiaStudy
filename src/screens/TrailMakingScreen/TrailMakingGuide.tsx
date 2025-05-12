import {Image, ImageSourcePropType, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {TrialRun} from '../../redux/reducers/participants';
import {useState} from 'react';

export function TrailMakingGuide({run}: {run: TrialRun}): React.ReactElement {
  const image = ((): ImageSourcePropType | undefined => {
    switch (run) {
      case TrialRun.Ground:
        return require('./round_1_trail_map.jpg');
      case TrialRun.Air1:
        return require('./round_2_trail_map.jpg');
      case TrialRun.Air2:
        return require('./round_3_trail_map.jpg');
      default:
        return undefined;
    }
  })();

  const [size, setSize] = useState<{width: number; height: number}>({width: 1, height: 1});
  const onLayout = (e: LayoutChangeEvent) => {
    setSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  return (
    <View onLayout={onLayout} style={{...StyleSheet.absoluteFillObject, opacity: 0.25}}>
      <Image source={image} resizeMode="cover" style={{...size, ...StyleSheet.absoluteFillObject}} />
    </View>
  );
}
