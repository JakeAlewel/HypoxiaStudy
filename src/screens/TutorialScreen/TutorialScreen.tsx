import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes, TrialRoutes} from '../../navigators/Routes';
import {TrialRun} from '../../redux/reducers/participants';
import {Image, ImageSourcePropType, View} from 'react-native';
import {Screen} from '../../components/Screen/Screen';
import {Button} from '../../components/Button/Button';
import {bordered} from '../../theme/border';
import {Colors} from '../../theme/colors';

export interface TutorialScreenParams {
  name: string;
  run: TrialRun;
  trialRoute: TrialRoutes;
}

type TrialStartScreenProps = NativeStackScreenProps<RootStackParamList, Routes.Tutorial>;

export function TutorialScreen({route, navigation}: TrialStartScreenProps): React.ReactElement {
  const {name, run, trialRoute} = route.params;

  const onBegin = () => {
    navigation.navigate(trialRoute, {
      name,
      run,
    });
  };

  const image = ((): ImageSourcePropType | undefined => {
    switch (trialRoute) {
      case Routes.ReactionTime:
        return require('./ReactionTime.jpg');
      case Routes.CardSorting:
        return require('./CardSorting.jpg');
      default:
        return undefined;
    }
  })();

  return (
    <Screen gutter style={{justifyContent: 'space-between'}}>
      {!!image ? (
        <Image
          source={image}
          resizeMode="contain"
          style={{
            ...bordered,
            alignSelf: 'center',
            width: '80%',
            height: 500,
            backgroundColor: Colors.Gold,
          }}
        />
      ) : (
        <View style={{flex: 1}} />
      )}
      <Button onPress={onBegin} title="Begin!" />
    </Screen>
  );
}
