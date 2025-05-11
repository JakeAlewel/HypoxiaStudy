import {TrialRun} from '../redux/reducers/participants';
import {ParticipantDetailsScreenParams} from '../screens/ParticipantDetailsScreen/ParticipantDetailsScreen';
import {TrialStartScreenParams} from '../screens/TrialStartScreen/TrialStartScreen';
import {TutorialScreenParams} from '../screens/Tutorial/Tutorial';

export enum Routes {
  HomeFeed = 'HomeFeed',
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
  [Routes.HomeFeed]: undefined;
  [Routes.ParticipantDetails]: ParticipantDetailsScreenParams;
  [Routes.TrialStart]: TrialStartScreenParams;
  [Routes.Tutorial]: TutorialScreenParams;
  [Routes.ReactionTime]: TrialRoutesScreenParams;
  [Routes.TrailMaking]: TrialRoutesScreenParams;
  [Routes.CardSorting]: TrialRoutesScreenParams;
  [Routes.LetterIdentification]: TrialRoutesScreenParams;
  [Routes.TrialCompletion]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
