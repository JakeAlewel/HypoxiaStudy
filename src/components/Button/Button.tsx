import {ButtonProps, Button as RNButton} from 'react-native';
import {Colors} from '../../theme/colors';

export function Button(props: ButtonProps): React.ReactElement {
  return <RNButton {...props} color={Colors.Blue} />;
}
