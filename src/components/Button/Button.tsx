import {ButtonProps as RNButtonProps, Button as RNButton, Text, Pressable, ViewStyle} from 'react-native';
import {Colors} from '../../theme/colors';
import {createPressableStyles} from '../../theme/button';
import {bordered} from '../../theme/border';

export interface ButtonProps extends RNButtonProps {
  variant?: 'native' | 'primary';
  /**
   * @warning only supported for non-native variants
   */
  style?: ViewStyle;
}

export function Button({variant = 'primary', ...props}: ButtonProps): React.ReactElement {
  if (variant === 'native') {
    return <RNButton {...props} color={Colors.Blue} />;
  }

  const {onPress, title, style} = props;

  return (
    <Pressable onPress={onPress} style={createPressableStyles({...bordered, ...style})}>
      <Text style={{fontSize: 32, textAlign: 'center'}}>{title}</Text>
    </Pressable>
  );
}
