import {PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';
import {Edges, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../theme/colors';

export interface ScreenProps {
  gutter?: boolean;
  style?: ViewStyle;
}

const edges: Edges = ['left', 'right', 'bottom'];

export function Screen({children, gutter, style}: PropsWithChildren<ScreenProps>): React.ReactElement {
  return (
    <SafeAreaView edges={edges} style={{backgroundColor: Colors.White, flex: 1, padding: gutter ? 16 : 0, ...style}}>
      {children}
    </SafeAreaView>
  );
}
