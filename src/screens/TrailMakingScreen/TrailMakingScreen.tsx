import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {Text} from 'react-native';
import {Button} from '../../components/Button/Button';

type TrailMakingScreenProps = NativeStackScreenProps<RootStackParamList, Routes.TrailMaking>;

export function TrailMakingScreen({route, navigation}: TrailMakingScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const onComplete = () => {
    navigation.popTo(Routes.Tutorial, {
      name,
      run,
      trialRoute: Routes.CardSorting,
    });
  };

  return (
    <Screen gutter>
      <Text>Made it</Text>
      <Button title={'Next'} onPress={onComplete} />
    </Screen>
  );
}
