import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../theme/colors';

export function TrailLine({
  x,
  y,
  length,
  angle,
  index,
  targetIndex,
}: {
  x: number;
  y: number;
  length: number;
  angle: number;
  index: number;
  targetIndex: number;
}): React.ReactElement | null {
  if (targetIndex < index + 1) {
    return null;
  }

  console.log(x, y, (angle * 180) / Math.PI);
  return (
    <View
      style={{
        position: 'absolute',
        top: -4,
        left: -0.5,
        backgroundColor: Colors.DarkBlue,
        width: 1,
        height: 8,
        transform: [{translateX: x}, {translateY: y}, {rotate: `${angle}rad`}, {scaleX: length}],
      }}
    />
  );
}
