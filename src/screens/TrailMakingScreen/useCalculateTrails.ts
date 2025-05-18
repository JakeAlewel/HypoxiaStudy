import {useMemo} from 'react';
import {MarkerSize} from './TrailMarker';

export function useCalculateTrails(
  markers: {top: number; left: number}[],
): {x: number; y: number; length: number; angle: number}[] {
  return useMemo(() => {
    const res = [{x: 0, y: 0, length: 0, angle: 0}];
    for (let i = 1; i < markers.length - 1; i++) {
      const prevCenterX = markers[i - 1].left + MarkerSize / 2;
      const prevCenterY = markers[i - 1].top + MarkerSize / 2;
      const currCenterX = markers[i].left + MarkerSize / 2;
      const currCenterY = markers[i].top + MarkerSize / 2;

      const centerX = (prevCenterX + currCenterX) / 2;
      const centerY = (prevCenterY + currCenterY) / 2;
      const deltaX = currCenterX - prevCenterX;
      const deltaY = currCenterY - prevCenterY;
      const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const angle = Math.atan2(deltaY, deltaX);

      res.push({
        x: centerX - MarkerSize / 2,
        y: centerY - MarkerSize / 2,
        length,
        angle,
      });
    }

    return res;
  }, [markers]);
}
