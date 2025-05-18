import {Pressable, View, ViewStyle} from 'react-native';
import {Shape} from './CardRules';
import {bordered} from '../../theme/border';
import {ShapeToComponentMap} from './Shapes';
import {createPressableStyles} from '../../theme/button';
import {Colors} from '../../theme/colors';

export interface ShapeCardProps {
  shape: Shape;
  count: number;
  color: number;
  style?: ViewStyle;
  onPress?: () => void;
}

const ColorMap: Record<string, Colors> = {
  1: Colors.Red,
  2: Colors.Blue,
  3: Colors.Green,
  4: Colors.Gold,
};

export function ShapeCard({shape, count, color, style, onPress}: ShapeCardProps): React.ReactElement {
  const ShapeComponent = ShapeToComponentMap[shape];

  const styles: ViewStyle = {
    ...bordered,
    aspectRatio: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    gap: 16,
    flexWrap: 'wrap',
    ...style,
  };

  const children = new Array(count).fill(0).map((_, index) => {
    return <ShapeComponent key={index} color={ColorMap[color]} />;
  });

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={createPressableStyles(styles)}>
        {children}
      </Pressable>
    );
  }

  return <View style={styles}>{children}</View>;
}
