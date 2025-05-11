import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {Text} from 'react-native';
import {Button} from '../../components/Button/Button';

type ReactionTimeScreenProps = NativeStackScreenProps<RootStackParamList, Routes.ReactionTime>;

export function ReactionTimeScreen({route, navigation}: ReactionTimeScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const onComplete = () => {
    navigation.popTo(Routes.Tutorial, {
      name,
      run,
      trialRoute: Routes.TrailMaking,
    });
  };

  return (
    <Screen gutter>
      <Text>Made it</Text>
      <Button title={'Next'} onPress={onComplete} />
    </Screen>
  );
}
