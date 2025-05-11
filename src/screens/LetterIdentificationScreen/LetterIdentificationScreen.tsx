import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {Text} from 'react-native';
import {Button} from '../../components/Button/Button';

type LetterIdentificationScreenProps = NativeStackScreenProps<RootStackParamList, Routes.LetterIdentification>;

export function LetterIdentificationScreen({route, navigation}: LetterIdentificationScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const onComplete = () => {
    navigation.replace(Routes.TrialCompletion, {
      name,
      run,
    });
  };

  return (
    <Screen gutter>
      <Text>Made it</Text>
      <Button title={'Next'} onPress={onComplete} />
    </Screen>
  );
}
