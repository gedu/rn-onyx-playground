import React, {useCallback} from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import Onyx from 'react-native-onyx';
import type {RootStackParamList} from '../stacks/root';
import {populateOnyx} from '../lib/onyx';

type ScreenName = keyof RootStackParamList;

interface Item {
  title: string;
  screen: ScreenName;
  description: string;
}

// List experiments here
const data: Item[] = [
  {
    screen: 'JotaiCollection',
    title: 'Onyx + Jotai (collection)',
    description:
      'Jotai as a React synchronisation layer for Onyx, with a collection (key/value pairs)',
  },
  {
    screen: 'WithOnyxCollection',
    title: 'Onyx + withOnyx (collection)',
    description:
      'WithOnyx HOC as a React synchronisation layer for Onyx, with a collection (key/value pairs)',
  },
];

const keyExtractor = (item: Item) => item.title;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: Props) {
  useFocusEffect(
    useCallback(() => {
      Onyx.clear();
      populateOnyx();
    }, []),
  );

  const renderItem: ListRenderItem<Item> = useCallback(
    ({item}) => (
      <Pressable
        onPress={() => navigation.navigate(item.screen)}
        style={styles.itemList}>
        <Text style={styles.itemListTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
      </Pressable>
    ),
    [navigation],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 30,
    gap: 30,
  },
  itemList: {
    paddingHorizontal: 16,
  },
  itemListTitle: {
    color: 'dodgerblue',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Home;
