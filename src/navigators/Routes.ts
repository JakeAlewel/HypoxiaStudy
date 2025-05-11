import {ParticipantDetailsScreenParams} from '../screens/ParticipantDetailsScreen/ParticipantDetailsScreen';

export enum Routes {
  HomeFeed = 'HomeFeed',
  ParticipantDetails = 'ParticipantDetails',
}

export type RootStackParamList = {
  [Routes.HomeFeed]: undefined;
  [Routes.ParticipantDetails]: ParticipantDetailsScreenParams;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
