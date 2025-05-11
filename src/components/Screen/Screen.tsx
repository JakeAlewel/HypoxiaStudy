import {PropsWithChildren} from 'react';
import {View} from 'react-native';

export function Screen({children, gutter}: PropsWithChildren<{gutter?: boolean}>): React.ReactElement {
  return <View style={{backgroundColor: 'white', flex: 1, padding: gutter ? 8 : 0}}>{children}</View>;
}
