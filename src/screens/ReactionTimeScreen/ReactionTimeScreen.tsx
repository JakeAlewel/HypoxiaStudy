import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {Text, View} from 'react-native';
import {TargetButton, TargetButtonSize} from './TargetButton';
import {useEffect, useRef, useState} from 'react';
import {Delay, Delays, Index} from './Delays';
import {Colors} from '../../theme/colors';
import {useDispatch} from 'react-redux';
import {recordResults} from '../../redux/reducers/participants';

type ReactionTimeScreenProps = NativeStackScreenProps<RootStackParamList, Routes.ReactionTime>;

enum GameState {
  Idle,
  Primed,
  Waiting,
}

const START_BUTTON_INDEX = 5;

export interface ReactionTimeTestResults {
  buttonResults: {
    delayToLift: number;
    delayToPress: number;
    correct: boolean;
  }[];
  earlyLiftCount: number;
}

export function ReactionTimeScreen({route, navigation}: ReactionTimeScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const dispatch = useDispatch();

  const testResults = useRef<ReactionTimeTestResults>({
    buttonResults: [],
    earlyLiftCount: 0,
  });

  const onComplete = () => {
    dispatch(
      recordResults({
        name,
        run,
        results: {
          reactionTimeResults: testResults.current,
        },
      }),
    );
    navigation.popTo(Routes.Tutorial, {
      name,
      run,
      trialRoute: Routes.TrailMaking,
    });
  };

  const delays = Delays[run];
  const [state, setState] = useState<GameState>(GameState.Idle);
  const [currentDelayIndex, setCurrentDelayIndex] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');

  const highlightButtonTime = useRef<number>(0);
  const startButtonLiftTime = useRef<number>(0);

  const gameTimeout = useRef<NodeJS.Timeout>(undefined);

  const createPressInHandler = (index: number) => {
    if (index === START_BUTTON_INDEX) {
      if (state === GameState.Idle) {
        return () => {
          setErrorMessage('');
          setState(GameState.Primed);

          gameTimeout.current = setTimeout(() => {
            highlightButtonTime.current = new Date().getTime();
            setState(GameState.Waiting);
            setHighlightedIndex(delays[currentDelayIndex][Index] - 1);
          }, delays[currentDelayIndex][Delay] * 1000);
        };
      }

      return undefined;
    }

    // Target Buttons
    if (state === GameState.Waiting) {
      return () => {
        testResults.current.buttonResults.push({
          delayToLift: startButtonLiftTime.current - highlightButtonTime.current,
          delayToPress: new Date().getTime() - highlightButtonTime.current,
          correct: index === highlightedIndex,
        });

        if (currentDelayIndex === delays.length - 1) {
          onComplete();
        } else {
          setHighlightedIndex(-1);
          setState(GameState.Idle);
          setCurrentDelayIndex(prev => prev + 1);
        }
      };
    }

    return undefined;
  };

  const createPressOutHandler = (index: number) => {
    if (index === START_BUTTON_INDEX) {
      if (state === GameState.Primed) {
        return () => {
          clearTimeout(gameTimeout.current);
          setState(GameState.Idle);
          setErrorMessage('Please wait for a target to activate.');
          testResults.current.earlyLiftCount += 1;
        };
      } else if (state === GameState.Waiting) {
        return () => {
          startButtonLiftTime.current = new Date().getTime();
        };
      }

      return undefined;
    }

    return undefined;
  };

  const [size, setSize] = useState<{width: number; height: number}>({width: 1, height: 1});
  const [buttonPositions, setButtonPositions] = useState<{top: number; left: number}[]>([]);

  useEffect(() => {
    const {width, height} = size;
    const magnitude = height - TargetButtonSize;
    const maxX = (width - TargetButtonSize) / 2;

    const startAngle = Math.atan2(Math.sqrt(magnitude ** 2 - maxX ** 2), maxX);
    const angleSweep = (Math.PI / 2 - startAngle) * 2;
    const angleSteps = angleSweep / 4;

    const positions = [];

    for (let i = 0; i < 5; i++) {
      positions.push({
        top: height - Math.sin(startAngle + angleSteps * i) * magnitude - TargetButtonSize,
        left: Math.cos(startAngle + angleSteps * i) * magnitude - TargetButtonSize / 2 + width / 2,
      });
    }

    const finalButtonPosition = {
      top: height - TargetButtonSize,
      left: (width - TargetButtonSize) / 2,
    };

    positions.push(finalButtonPosition);

    setButtonPositions(positions);
  }, [size]);

  return (
    <Screen style={{paddingTop: 16}}>
      <View onLayout={e => setSize(e.nativeEvent.layout)} style={{flex: 1, position: 'relative'}} collapsable={false}>
        {buttonPositions.map((pos, index) => (
          <TargetButton
            key={index}
            enabled={index === highlightedIndex}
            style={pos}
            onPressIn={createPressInHandler(index)}
            onPressOut={createPressOutHandler(index)}
          />
        ))}
        {(state === GameState.Idle || !!errorMessage) && (
          <Text
            style={{
              color: Colors.Red,
              textAlign: 'center',
              position: 'absolute',
              left: 0,
              right: 0,
              top: undefined,
              bottom: TargetButtonSize + 16,
            }}>
            {errorMessage ? errorMessage : 'Press the button to continue'}
          </Text>
        )}
      </View>
    </Screen>
  );
}
