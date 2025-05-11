import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../../screens/HomeScreen/HomeScreen';
import {Colors} from '../../theme/colors';
import {RootStackParamList, Routes} from '../Routes';
import {ParticipantDetailsScreen} from '../../screens/ParticipantDetailsScreen/ParticipantDetailsScreen';
import {TrialStartScreen} from '../../screens/TrialStartScreen/TrialStartScreen';
import {TutorialScreen} from '../../screens/Tutorial/Tutorial';
import {TrialNames} from '../../strings/TrialNames';

const RootStackNavigator = createNativeStackNavigator<RootStackParamList>();

export function RootStack(): React.JSX.Element {
  return (
    <RootStackNavigator.Navigator
      initialRouteName={Routes.HomeFeed}
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
        name={Routes.HomeFeed}
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
        options={({
          route: {
            params: {trialRoute},
          },
        }) => ({
          headerTitle: `${TrialNames[trialRoute]}`,
          headerBackVisible: false,
          gestureEnabled: false,
        })}
      />
    </RootStackNavigator.Navigator>
  );
}
