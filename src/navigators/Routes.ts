import {TrialRun} from '../redux/reducers/participants';
import {ParticipantDetailsScreenParams} from '../screens/ParticipantDetailsScreen/ParticipantDetailsScreen';
import {TrialCompletionScreenParams} from '../screens/TrialCompletionScreen/TrialCompletionScreen';
import {TrialStartScreenParams} from '../screens/TrialStartScreen/TrialStartScreen';
import {TutorialScreenParams} from '../screens/TutorialScreen/TutorialScreen';

export enum Routes {
  HomeScreen = 'HomeScreen',
  ParticipantDetails = 'ParticipantDetails',
  TrialStart = 'TrialStart',
  Tutorial = 'Tutorial',
  ReactionTime = 'ReactionTime',
  TrailMaking = 'TrailMaking',
  CardSorting = 'CardSorting',
  LetterIdentification = 'LetterIdentification',
  TrialCompletion = 'TrialCompletion',
}

export type TrialRoutes = Routes.ReactionTime | Routes.TrailMaking | Routes.CardSorting | Routes.LetterIdentification;

export interface TrialRoutesScreenParams {
  name: string;
  run: TrialRun;
}

export type RootStackParamList = {
  [Routes.HomeScreen]: undefined;
  [Routes.ParticipantDetails]: ParticipantDetailsScreenParams;
  [Routes.TrialStart]: TrialStartScreenParams;
  [Routes.Tutorial]: TutorialScreenParams;
  [Routes.ReactionTime]: TrialRoutesScreenParams;
  [Routes.TrailMaking]: TrialRoutesScreenParams;
  [Routes.CardSorting]: TrialRoutesScreenParams;
  [Routes.LetterIdentification]: TrialRoutesScreenParams;
  [Routes.TrialCompletion]: TrialCompletionScreenParams;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
