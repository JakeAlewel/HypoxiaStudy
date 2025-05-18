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

function TestStatus({name, run, completed}: {name: string; run: TrialRun; completed: boolean}): React.ReactElement {
  const navigation = useNavigation();

  const styles: ViewStyle = {
    ...bordered,
    padding: 16,
    flexDirection: 'row',
  };

  const children = (
    <>
      <Text style={{flexGrow: 1}}>{RunNames[run]}</Text>
      <Text style={{flexShrink: 0, color: Colors.Orange}}>
        {completed ? String.fromCodePoint(0x2705) : 'Not completed'}
      </Text>
    </>
  );

  if (completed) {
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
        {Object.values(participant.trials).map(trial => (
          <TestStatus key={trial.run} name={name} run={trial.run} completed={isTrialComplete(trial)} />
        ))}
      </View>
    </Screen>
  );
}
