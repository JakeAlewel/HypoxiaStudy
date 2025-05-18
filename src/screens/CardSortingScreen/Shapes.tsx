import {Shape} from './CardRules';
import Svg, {Circle as SvgCircle, Rect, Polygon} from 'react-native-svg';

export interface ShapeProps {
  color: string;
}

export function Circle({color}: ShapeProps): React.ReactElement {
  return (
    <Svg viewBox="0 0 48 48" width={48} height={48}>
      <SvgCircle fill={color} cx={24} cy={24} r={24} />
    </Svg>
  );
}

export function Plus({color}: ShapeProps): React.ReactElement {
  return (
    <Svg viewBox="0 0 48 48" width={48} height={48}>
      <Rect fill={color} x={15} width={18} height={48} rx={0} ry={0} />
      <Rect fill={color} y={15} width={48} height={18} rx={0} ry={0} />
    </Svg>
  );
}

export function Star({color}: ShapeProps): React.ReactElement {
  return (
    <Svg viewBox="0 0 48 48" width={48} height={48}>
      <Polygon fill={color} points="24,0 30,18 48,18 32,28 44,48 24,34 4,48 16,28 0,18 18,18" />
    </Svg>
  );
}

export function Triangle({color}: ShapeProps): React.ReactElement {
  return (
    <Svg viewBox="0 0 48 48" width={48} height={48}>
      <Polygon fill={color} points="24,2 48,48 0,48" />
    </Svg>
  );
}

export const ShapeToComponentMap: Record<Shape, React.ComponentType<ShapeProps>> = {
  [Shape.Circle]: Circle,
  [Shape.Plus]: Plus,
  [Shape.Star]: Star,
  [Shape.Triangle]: Triangle,
};
