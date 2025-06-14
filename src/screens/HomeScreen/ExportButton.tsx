import {Alert} from 'react-native';
import {Button} from '../../components/Button/Button';
import {ParticipantsState, TestResultsBase, Trial, TrialRun} from '../../redux/reducers/participants';
import {store} from '../../redux/rootStore';
import {Colors} from '../../theme/colors';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {ReactionTimeTestResults} from '../ReactionTimeScreen/ReactionTimeScreen';
import {TrailMakingResults} from '../TrailMakingScreen/TrailMakingScreen';
import {CardSortingResults} from '../CardSortingScreen/CardSortingScreen';
import {LetterIdentificationResults} from '../LetterIdentificationScreen/LetterIdentificationScreen';

type Stringable = string | number | boolean | undefined;

const baseTestResultsToColumns = (testName: string, results?: TestResultsBase): Stringable[] => {
  return [testName, results?.startTime, results?.endTime];
};

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

const trailMakingToColumns = (trailMaking?: TrailMakingResults): Stringable[] => {
  return [trailMaking?.completionTime, trailMaking?.errorCount];
};

const cardSortingToColumns = (cardSorting?: CardSortingResults): Stringable[] => {
  return [cardSorting?.errorCount];
};

const letterIdentificationToColumns = (letterIdentification?: LetterIdentificationResults): Stringable[] => {
  return (letterIdentification?.entries ?? []).reduce<Stringable[]>((arr, entry) => {
    arr.push(entry.guess);
    arr.push(entry.correct);
    arr.push(entry.delay);
    return arr;
  }, []);
};

const trialDataToColumns = (trial: Trial): Stringable[] => {
  return [
    ...baseTestResultsToColumns('ReactionTime', trial.reactionTimeResults),
    ...reactionTimeToColumns(trial.reactionTimeResults),

    ...baseTestResultsToColumns('TrailMaking', trial.trailMakingResults),
    ...trailMakingToColumns(trial.trailMakingResults),

    ...baseTestResultsToColumns('CardSorting', trial.cardSortingResults),
    ...cardSortingToColumns(trial.cardSortingResults),

    ...baseTestResultsToColumns('LetterId', trial.letterIdentificationResults),
    ...letterIdentificationToColumns(trial.letterIdentificationResults),
  ];
};

const generateCSV = ({participants}: ParticipantsState): string => {
  const rows: string[] = Object.values(participants).map(participant => {
    const combinedData: Stringable[] = [
      participant.name,
      participant.dateAdded,
      ...trialDataToColumns(participant.trials[TrialRun.Ground]),
      ...trialDataToColumns(participant.trials[TrialRun.Air1]),
      ...trialDataToColumns(participant.trials[TrialRun.Air2]),
    ];

    return combinedData.join(',');
  });

  return rows.join('\n');
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
