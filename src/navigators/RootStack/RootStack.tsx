import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {HomeScreen} from '../../screens/HomeScreen/HomeScreen';
import {Colors} from '../../theme/colors';
import {RootStackParamList, Routes} from '../Routes';
import {ParticipantDetailsScreen} from '../../screens/ParticipantDetailsScreen/ParticipantDetailsScreen';
import {TrialStartScreen} from '../../screens/TrialStartScreen/TrialStartScreen';
import {TutorialScreen} from '../../screens/TutorialScreen/TutorialScreen';
import {TrialNames} from '../../strings/TrialNames';
import {ReactionTimeScreen} from '../../screens/ReactionTimeScreen/ReactionTimeScreen';
import {TrailMakingScreen} from '../../screens/TrailMakingScreen/TrailMakingScreen';
import {CardSortingScreen} from '../../screens/CardSortingScreen/CardSortingScreen';
import {LetterIdentificationScreen} from '../../screens/LetterIdentificationScreen/LetterIdentificationScreen';
import {TrialCompletionScreen} from '../../screens/TrialCompletionScreen/TrialCompletionScreen';

const RootStackNavigator = createNativeStackNavigator<RootStackParamList>();

const createTrialScreenOptions = (name: string): NativeStackNavigationOptions => ({
  headerTitle: name,
  headerBackVisible: false,
  gestureEnabled: false,
});

export function RootStack(): React.JSX.Element {
  return (
    <RootStackNavigator.Navigator
      initialRouteName={Routes.HomeScreen}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.DarkBlue,
        },
        headerTitleStyle: {
          color: Colors.Gold,
        },
        headerTintColor: Colors.Gold,
      }}>
      <RootStackNavigator.Screen
        component={HomeScreen}
        name={Routes.HomeScreen}
        options={{headerTitle: 'Hypoxia Study'}}
      />
      <RootStackNavigator.Screen
        component={ParticipantDetailsScreen}
        name={Routes.ParticipantDetails}
        options={{headerTitle: 'Participant Details'}}
      />
      <RootStackNavigator.Screen
        component={TrialStartScreen}
        name={Routes.TrialStart}
        options={{headerTitle: 'Trial Start'}}
      />
      <RootStackNavigator.Screen
        component={TutorialScreen}
        name={Routes.Tutorial}
        options={props => createTrialScreenOptions(TrialNames[props.route.params.trialRoute])}
      />
      <RootStackNavigator.Screen
        component={ReactionTimeScreen}
        name={Routes.ReactionTime}
        options={createTrialScreenOptions(TrialNames[Routes.ReactionTime])}
      />
      <RootStackNavigator.Screen
        component={TrailMakingScreen}
        name={Routes.TrailMaking}
        options={createTrialScreenOptions(TrialNames[Routes.TrailMaking])}
      />
      <RootStackNavigator.Screen
        component={CardSortingScreen}
        name={Routes.CardSorting}
        options={createTrialScreenOptions(TrialNames[Routes.CardSorting])}
      />
      <RootStackNavigator.Screen
        component={LetterIdentificationScreen}
        name={Routes.LetterIdentification}
        options={createTrialScreenOptions(TrialNames[Routes.LetterIdentification])}
      />
      <RootStackNavigator.Screen
        component={TrialCompletionScreen}
        name={Routes.TrialCompletion}
        options={createTrialScreenOptions('Trial Complete!')}
      />
    </RootStackNavigator.Navigator>
  );
}
