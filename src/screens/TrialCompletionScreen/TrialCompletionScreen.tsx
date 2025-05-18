import {Text, View} from 'react-native';
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

const parachutes = `
🪂   🪂
🪂🪂  🪂🪂
🪂🪂🪂🪂🪂
🪂🪂🪂
🪂
`;

export function TrialCompletionScreen({route, navigation}: TrialCompletionScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const onComplete = () => {
    navigation.reset({
      index: 0,
      routes: [{name: Routes.HomeScreen}],
    });
  };

  return (
    <Screen gutter style={{justifyContent: 'space-between'}}>
      <Text style={{fontSize: 38, fontWeight: 700, textAlign: 'center'}}>Thank you!</Text>
      <Text style={{fontSize: 52, textAlign: 'center', fontFamily: 'Courier New'}}>{parachutes}</Text>
      <View style={{gap: 16}}>
        <Text style={{fontSize: 18, fontWeight: 700, textAlign: 'center'}}>Have a safe jump!</Text>
        <Button title={'Finish'} onPress={onComplete} />
      </View>
    </Screen>
  );
}
