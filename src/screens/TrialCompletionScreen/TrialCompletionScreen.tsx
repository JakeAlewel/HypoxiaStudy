import {Text} from 'react-native';
import {Screen} from '../../components/Screen/Screen';
import {TrialRun} from '../../redux/reducers/participants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Button} from '../../components/Button/Button';

export interface TrialCompletionScreenParams {
  name: string;
  run: TrialRun;
}
type TrialCompletionScreenProps = NativeStackScreenProps<RootStackParamList, Routes.TrialCompletion>;

export function TrialCompletionScreen({route, navigation}: TrialCompletionScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const onComplete = () => {
    navigation.reset({
      index: 0,
      routes: [{name: Routes.HomeScreen}],
    });
  };

  return (
    <Screen gutter>
      <Text>Made it</Text>
      <Button title={'Finish'} onPress={onComplete} />
    </Screen>
  );
}
