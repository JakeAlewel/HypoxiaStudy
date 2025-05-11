import {StaticScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text} from 'react-native';
import {RootStackParamList, Routes} from '../../navigators/Routes';
import {Screen} from '../../components/Screen/Screen';

export interface ParticipantDetailsScreenParams {
  name: string;
}

type ParticpantDetailsScreenProps = NativeStackScreenProps<RootStackParamList, Routes.ParticipantDetails>;

export function ParticipantDetailsScreen({
  route: {
    params: {name},
  },
}: ParticpantDetailsScreenProps): React.ReactElement {
  return (
    <Screen gutter>
      <Text>Made it! {name}</Text>
    </Screen>
  );
}
