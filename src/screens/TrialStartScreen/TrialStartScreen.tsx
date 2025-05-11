import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {Text} from 'react-native';
import {TrialRun} from '../../redux/reducers/participants';
import {RunNames} from '../../strings/RunNames';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../components/Button/Button';

export interface TrialStartScreenParams {
  name: string;
  run: TrialRun;
}

type TrialStartScreenProps = NativeStackScreenProps<RootStackParamList, Routes.TrialStart>;

export function TrialStartScreen({
  route: {
    params: {name, run},
  },
}: TrialStartScreenProps): React.ReactElement {
  const navigation = useNavigation();

  const onBegin = () => {
    navigation.navigate(Routes.Tutorial, {
      name,
      run,
      trialRoute: Routes.ReactionTime,
    });
  };

  return (
    <Screen gutter style={{justifyContent: 'space-between'}}>
      <Text style={{fontSize: 24, textAlign: 'center', marginVertical: 24}}>
        Ready to begin {<Text style={{fontWeight: 700}}>{RunNames[run]}</Text>} trial?
      </Text>
      <Button onPress={onBegin} title="Begin!" />
    </Screen>
  );
}
