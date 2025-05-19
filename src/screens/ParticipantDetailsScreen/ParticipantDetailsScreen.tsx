import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Pressable, Text, View, ViewStyle} from 'react-native';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {TrialRun, useParticipant} from '../../redux/reducers/participants';
import {Colors} from '../../theme/colors';
import {RunNames} from '../../strings/RunNames';
import {createPressableStyles} from '../../theme/button';
import {bordered} from '../../theme/border';
import {isTrialComplete} from '../../redux/utils';

export interface ParticipantDetailsScreenParams {
  name: string;
}

type ParticpantDetailsScreenProps = NativeStackScreenProps<RootStackParamList, Routes.ParticipantDetails>;

function TestStatus({
  name,
  run,
  completed,
  enabled,
}: {
  name: string;
  run: TrialRun;
  completed: boolean;
  enabled: boolean;
}): React.ReactElement {
  const navigation = useNavigation();

  const styles: ViewStyle = {
    ...bordered,
    padding: 16,
    flexDirection: 'row',
    backgroundColor: enabled ? Colors.White : Colors.LightGray,
  };

  const children = (
    <>
      <Text style={{flexGrow: 1}}>{RunNames[run]}</Text>
      <Text style={{flexShrink: 0, color: Colors.Orange}}>
        {completed ? String.fromCodePoint(0x2705) : 'Not completed'}
      </Text>
    </>
  );

  if (completed || !enabled) {
    return <View style={styles}>{children}</View>;
  }

  const onPress = () => {
    navigation.navigate(Routes.TrialStart, {
      name,
      run,
    });
  };

  return (
    <Pressable onPress={onPress} style={createPressableStyles(styles)}>
      {children}
    </Pressable>
  );
}

export function ParticipantDetailsScreen({route}: ParticpantDetailsScreenProps): React.ReactElement {
  const {name} = route.params;
  const participant = useParticipant(name);

  const groundCompleted = isTrialComplete(participant.trials[TrialRun.Ground]);
  const air1Completed = isTrialComplete(participant.trials[TrialRun.Air1]);
  const air2Completed = isTrialComplete(participant.trials[TrialRun.Air2]);

  return (
    <Screen gutter style={{justifyContent: 'space-between'}}>
      <View>
        <Text
          style={{
            marginVertical: 16,
            textAlign: 'center',
            fontSize: 24,
          }}>
          {name}
        </Text>
        <Text style={{textAlign: 'center'}}>
          <Text style={{fontWeight: 600}}>Date created: </Text>
          {participant.dateAdded}
        </Text>
      </View>
      <View style={{gap: 16}}>
        <Text style={{fontSize: 18, fontWeight: 500}}>Trials:</Text>
        <TestStatus name={name} run={TrialRun.Ground} completed={groundCompleted} enabled />
        <TestStatus name={name} run={TrialRun.Air1} completed={air1Completed} enabled={groundCompleted} />
        <TestStatus
          name={name}
          run={TrialRun.Air2}
          completed={air2Completed}
          enabled={groundCompleted && air1Completed}
        />
      </View>
    </Screen>
  );
}
