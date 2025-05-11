import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {addParticipant, Participant, removeParticipant, selectParticipants} from '../../redux/reducers/participants';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {useDispatch, useSelector} from 'react-redux';
import {useMemo, useState} from 'react';
import {Screen} from '../../components/Screen/Screen';
import {Colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../navigators/Routes';
import {createPressableStyles} from '../../theme/button';
import {Button} from '../../components/Button/Button';

function SearchBar({term, setTerm}: {term: string; setTerm: (a: string) => void}): React.ReactElement {
  const dispatch = useDispatch();
  const participants = useSelector(selectParticipants);
  const termAlreadyExists = Object.keys(participants).find(name => name.toLowerCase() === term.toLowerCase());

  const onCreate = () => {
    if (!termAlreadyExists) {
      dispatch(addParticipant({name: term}));
      setTerm('');
    }
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', margin: 8, gap: 8}}>
      <TextInput
        value={term}
        onChange={e => setTerm(e.nativeEvent.text)}
        style={{
          flexGrow: 1,
          borderWidth: 1,
          borderColor: Colors.DarkBlue,
          borderRadius: 8,
          padding: 8,
          backgroundColor: Colors.White,
        }}
        clearButtonMode="always"
        placeholder="Create / Search Participant"
      />
      {!!term && <Button variant="native" title="Create" onPress={onCreate} disabled={!!termAlreadyExists} />}
    </View>
  );
}

function UserRow({name, trials}: Participant): React.ReactElement {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRowTap = () => {
    navigation.navigate(Routes.ParticipantDetails, {
      name,
    });
  };

  const handleDelete = () => {
    Alert.alert(`Delete data for "${name}"?`, 'This cannot be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Delete', style: 'destructive', onPress: () => dispatch(removeParticipant(name))},
    ]);
  };

  return (
    <Pressable
      onPress={handleRowTap}
      style={createPressableStyles({
        gap: 8,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
      })}>
      <Text style={{flexGrow: 1, paddingHorizontal: 8}}>{name}</Text>
      <View style={{gap: 8, flexDirection: 'row', alignItems: 'center'}}>
        {Object.values(trials).map(({completed}, index) => (
          <Text key={index} style={{opacity: completed ? 1 : 0.25}}>
            🪂
          </Text>
        ))}
      </View>
      <Pressable
        onPress={handleDelete}
        style={createPressableStyles({flexShrink: 0, justifyContent: 'center', paddingHorizontal: 8, borderRadius: 8})}>
        <Text>🗑️</Text>
      </Pressable>
    </Pressable>
  );
}

const renderItem = ({item}: ListRenderItemInfo<Participant>) => {
  return <UserRow {...item} />;
};

function Divider(): React.ReactElement {
  return (
    <View
      style={{height: StyleSheet.hairlineWidth, flexGrow: 1, marginHorizontal: 8, backgroundColor: Colors.DarkBlue}}
    />
  );
}

function ListEmptyState(): React.ReactElement {
  return (
    <Text style={{marginVertical: 32, marginHorizontal: 32, fontSize: 18, textAlign: 'center'}}>
      {
        "🪂🪂🪂\n\nThe weather is always great at the dropzone!\n\nLet's add some jumpers and get this science started!\n\n🪂🪂🪂"
      }
    </Text>
  );
}

const keyExtractor = (participant: Participant) => participant.name;

export function HomeScreen(): React.ReactElement {
  const [term, setTerm] = useState('');

  const participants = useSelector(selectParticipants);

  const sortedAndFilteredParticipants = useMemo(() => {
    const filteredParticipants = Object.values(participants).filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase()),
    );
    const sortedParticipants = filteredParticipants.sort(
      ({dateAdded: dateA}, {dateAdded: dateB}) => new Date(dateB).getTime() - new Date(dateA).getTime(),
    );
    return sortedParticipants;
  }, [participants]);

  return (
    <Screen>
      <SearchBar term={term} setTerm={setTerm} />
      <FlashList
        keyboardShouldPersistTaps="handled"
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={sortedAndFilteredParticipants}
        extraData={sortedAndFilteredParticipants.length}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={ListEmptyState}
        estimatedItemSize={62}
      />
    </Screen>
  );
}
