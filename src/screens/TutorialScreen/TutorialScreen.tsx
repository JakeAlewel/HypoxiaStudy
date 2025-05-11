import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes, TrialRoutes} from '../../navigators/Routes';
import {TrialRun} from '../../redux/reducers/participants';
import {View} from 'react-native';
import {Screen} from '../../components/Screen/Screen';
import {Button} from '../../components/Button/Button';

export interface TutorialScreenParams {
  name: string;
  run: TrialRun;
  trialRoute: TrialRoutes;
}

type TrialStartScreenProps = NativeStackScreenProps<RootStackParamList, Routes.Tutorial>;

export function TutorialScreen({route, navigation}: TrialStartScreenProps): React.ReactElement {
  const {name, run, trialRoute} = route.params;

  const onBegin = () => {
    navigation.navigate(trialRoute, {
      name,
      run,
    });
  };

  return (
    <Screen gutter style={{justifyContent: 'space-between'}}>
      <View style={{flex: 1}} />
      <Button onPress={onBegin} title="Begin!" />
    </Screen>
  );
}
