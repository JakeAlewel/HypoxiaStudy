import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../theme/colors';

const INITIAL_WIDTH = 1;
const INITIAL_HEIGHT = 8;

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

  return (
    <View
      style={{
        position: 'absolute',
        top: -INITIAL_HEIGHT / 2,
        left: -INITIAL_WIDTH / 2,
        backgroundColor: Colors.DarkBlue,
        width: INITIAL_WIDTH,
        height: INITIAL_HEIGHT,
        transform: [{translateX: x}, {translateY: y}, {rotate: `${angle}rad`}, {scaleX: length}],
      }}
    />
  );
}
