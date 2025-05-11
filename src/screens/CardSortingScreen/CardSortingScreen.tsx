import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {Text} from 'react-native';
import {Button} from '../../components/Button/Button';

type CardSortingScreenProps = NativeStackScreenProps<RootStackParamList, Routes.CardSorting>;

export function CardSortingScreen({route, navigation}: CardSortingScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const onComplete = () => {
    navigation.popTo(Routes.Tutorial, {
      name,
      run,
      trialRoute: Routes.LetterIdentification,
    });
  };

  return (
    <Screen gutter>
      <Text>Made it</Text>
      <Button title={'Next'} onPress={onComplete} />
    </Screen>
  );
}
