import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View} from 'react-native';
import {LetterRules} from './LetterRules';
import {recordResults} from '../../redux/reducers/participants';
import {useEffect, useRef, useState} from 'react';
import {bordered} from '../../theme/border';
import {useDispatch} from 'react-redux';

export interface LetterIdentificationEntry {
  delay: number;
  guess: string;
  correct: boolean;
}

export interface LetterIdentificationResults {
  entries: LetterIdentificationEntry[];
}

type LetterIdentificationScreenProps = NativeStackScreenProps<RootStackParamList, Routes.LetterIdentification>;

export function LetterIdentificationScreen({route, navigation}: LetterIdentificationScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const dispatch = useDispatch();

  const entries = useRef<LetterIdentificationEntry[]>([]);

  const onComplete = () => {
    dispatch(
      recordResults({
        name,
        run,
        results: {
          letterIdentificationResults: {
            entries: entries.current,
          },
        },
      }),
    );

    navigation.replace(Routes.TrialCompletion, {
      name,
      run,
    });
  };

  const rules = LetterRules[run];
  const [ruleIndex, setRuleIndex] = useState<number>(0);
  const {display, target, correctAnswer} = rules[ruleIndex];

  const lastShownRef = useRef<Date>(new Date());

  useEffect(() => {
    lastShownRef.current = new Date();
  }, [ruleIndex]);

  const handleLetter = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const delay = new Date().getTime() - lastShownRef.current.getTime();
    const guess = e.nativeEvent.text;
    const correct = guess.toUpperCase() === correctAnswer.toUpperCase();

    entries.current.push({
      delay,
      guess,
      correct,
    });

    if (ruleIndex < rules.length - 1) {
      setRuleIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <Screen gutter style={{justifyContent: 'space-between'}}>
      <View style={{alignItems: 'center', gap: 16}}>
        <View style={{...bordered, aspectRatio: 1, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontFamily: 'Courier New', fontSize: 32, lineHeight: 28, textAlign: 'left'}}>{display}</Text>
        </View>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          What is the {<Text style={{fontWeight: 700}}>{target}</Text>} letter?
        </Text>
      </View>
      <TextInput
        onChange={handleLetter}
        value=""
        autoFocus
        keyboardType="ascii-capable"
        textContentType="none"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </Screen>
  );
}
