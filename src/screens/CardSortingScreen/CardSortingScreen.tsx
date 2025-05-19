import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';
import {Text, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {ShapeCard} from './ShapeCard';
import {CardRules, Shape} from './CardRules';
import {Colors} from '../../theme/colors';
import {useRecordResults} from '../../redux/utils';

enum FeedbackState {
  NotStarted = 'NotStarted',
  None = 'None',
  Correct = 'Correct',
  Incorrect = 'Incorrect',
}

export interface CardSortingResults {
  errorCount: number;
}

type CardSortingScreenProps = NativeStackScreenProps<RootStackParamList, Routes.CardSorting>;

export function CardSortingScreen({route, navigation}: CardSortingScreenProps): React.ReactElement {
  const {name, run} = route.params;
  const {record} = useRecordResults(name, run);

  const errorCount = useRef(0);

  const onComplete = () => {
    record('cardSortingResults', {
      errorCount: errorCount.current,
    });

    navigation.popTo(Routes.Tutorial, {
      name,
      run,
      trialRoute: Routes.LetterIdentification,
    });
  };

  const rules = CardRules[run];
  const [ruleIndex, setRuleIndex] = useState<number>(0);
  const [answerFeedback, setAnswerFeedback] = useState<FeedbackState>(FeedbackState.NotStarted);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (answerFeedback === FeedbackState.Correct || answerFeedback === FeedbackState.Incorrect) {
      feedbackTimeoutRef.current = setTimeout(() => {
        setAnswerFeedback(FeedbackState.None);
      }, 1500);
    } else if (answerFeedback === FeedbackState.None) {
      if (ruleIndex !== rules.length - 1) {
        setRuleIndex(prev => prev + 1);
      } else {
        onComplete();
      }
    }
    return () => {
      clearTimeout(feedbackTimeoutRef.current);
    };
  }, [answerFeedback]);

  const shapeCardProps = (i: number) => ({
    color: i,
    count: i,
    onPress:
      answerFeedback === FeedbackState.None || answerFeedback === FeedbackState.NotStarted
        ? () => {
            const correct = i === rules[ruleIndex].correctAnswer;
            setAnswerFeedback(correct ? FeedbackState.Correct : FeedbackState.Incorrect);
            if (!correct) {
              errorCount.current += 1;
            }
          }
        : undefined,
  });

  return (
    <Screen gutter style={{justifyContent: 'space-between'}}>
      <View style={{alignItems: 'center', gap: 8}}>
        <ShapeCard {...rules[ruleIndex]} style={{width: '50%'}} />
        {(answerFeedback === FeedbackState.Correct || answerFeedback === FeedbackState.Incorrect) && (
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: answerFeedback === FeedbackState.Correct ? Colors.DarkBlue : Colors.Orange,
            }}>
            {answerFeedback === FeedbackState.Correct ? 'Correct' : 'Incorrect'}!
          </Text>
        )}
      </View>

      <View style={{gap: 8, flexDirection: 'column', flexWrap: 'wrap'}}>
        <View style={{flexDirection: 'row', gap: 8}}>
          <ShapeCard shape={Shape.Circle} {...shapeCardProps(1)} />
          <ShapeCard shape={Shape.Triangle} {...shapeCardProps(2)} />
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <ShapeCard shape={Shape.Plus} {...shapeCardProps(3)} />
          <ShapeCard shape={Shape.Star} {...shapeCardProps(4)} />
        </View>
      </View>
    </Screen>
  );
}
