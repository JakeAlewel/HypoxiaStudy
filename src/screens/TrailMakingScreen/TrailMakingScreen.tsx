import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {View} from 'react-native';
import {useRef, useState} from 'react';
import {MarkerPositions} from './MarkerPositions';
import {TrailMarker} from './TrailMarker';
import {useCalculateTrails} from './useCalculateTrails';
import {TrailLine} from './TrailLine';
import {useRecordResults} from '../../redux/utils';

type TrailMakingScreenProps = NativeStackScreenProps<RootStackParamList, Routes.TrailMaking>;

export interface TrailMakingResults {
  errorCount: number;
  completionTime: number;
}

export function TrailMakingScreen({route, navigation}: TrailMakingScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const {record} = useRecordResults(name, run);

  const errorCount = useRef(0);
  const startTime = useRef(new Date().getTime());

  const onComplete = () => {
    record('trailMakingResults', {
      errorCount: errorCount.current,
      completionTime: new Date().getTime() - startTime.current,
    });

    navigation.popTo(Routes.Tutorial, {
      name,
      run,
      trialRoute: Routes.CardSorting,
    });
  };

  const markers = MarkerPositions[run];
  const trails = useCalculateTrails(markers);
  const [targetIndex, setTargetIndex] = useState(0);

  const createPressHandler = (index: number) => () => {
    if (index === targetIndex) {
      if (targetIndex === markers.length - 1) {
        onComplete();
      }
      setTargetIndex(targetIndex + 1);
    } else {
      errorCount.current += 1;
    }
  };

  return (
    <Screen>
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        {trails.map((pos, index) => (
          <TrailLine key={index} index={index} targetIndex={targetIndex} {...pos} />
        ))}
        {markers.map((pos, index) => (
          <TrailMarker
            key={index}
            position={pos}
            index={index}
            targetIndex={targetIndex}
            onPress={createPressHandler(index)}
          />
        ))}
        {/* Uncomment to display the original layout guide image */}
        {/* <TrailMakingGuide run={run} /> */}
      </View>
    </Screen>
  );
}
