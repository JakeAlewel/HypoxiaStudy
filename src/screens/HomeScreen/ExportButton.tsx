import {Alert} from 'react-native';
import {Button} from '../../components/Button/Button';
import {ParticipantsState, Trial, TrialRun} from '../../redux/reducers/participants';
import {store} from '../../redux/rootStore';
import {Colors} from '../../theme/colors';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {ReactionTimeTestResults} from '../ReactionTimeScreen/ReactionTimeScreen';

type Stringable = string | number | boolean | undefined;

const reactionTimeToColumns = (reactionTime?: ReactionTimeTestResults): Stringable[] => {
  return [
    reactionTime?.earlyLiftCount,
    ...(reactionTime?.buttonResults ?? []).reduce<Stringable[]>((acc, delay) => {
      acc.push(delay.delayToLift);
      acc.push(delay.delayToPress);
      acc.push(delay.correct);
      return acc;
    }, []),
  ];
};

const trialDataToColumns = (trial: Trial): Stringable[] => {
  return [
    ...reactionTimeToColumns(trial.reactionTimeResults),
    // ...trailMakingToColumns(trial.trailMakingResults),
    // ...cardSortingToColumns(trial.cardSortingResults),
    // ...letterMatchingToColumns(trial.letterMatchingResults),
  ];
};

const generateCSV = ({participants}: ParticipantsState): string => {
  console.log(JSON.stringify(participants, null, 2));

  const data: string = Object.values(participants)
    .map(participant =>
      [
        participant.name,
        participant.dateAdded,
        ...trialDataToColumns(participant.trials[TrialRun.Ground]),
        ...trialDataToColumns(participant.trials[TrialRun.Air1]),
        ...trialDataToColumns(participant.trials[TrialRun.Air2]),
      ].join(','),
    )
    .join('\n');

  return data;
};

export function ExportButton(): React.ReactElement {
  const handleExport = () => {
    const {participants} = store.getState();
    const path = RNFS.DocumentDirectoryPath + '/exported-data.txt';

    RNFS.writeFile(path, generateCSV(participants), 'utf8')
      .then(() => {
        Share.open({
          url: 'file://' + path,
        }).catch(err => {
          Alert.alert(`${err}`, 'Sorry Ethan...');
        });
      })
      .catch(err => {
        Alert.alert(`${err}`, 'Sorry Ethan...');
      });
  };

  return <Button title="Export" variant="native" onPress={handleExport} color={Colors.Gold} />;
}
