import React, {useCallback} from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../stacks/root';
import {useFocusEffect} from '@react-navigation/native';
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
    screen: 'JotaiOnyx',
    title: 'Onyx with Jotai',
    description: 'Jotai as a React synchronisation layer for Onyx',
  },
];

const keyExtractor = (item: Item) => item.title;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: Props) {
  useFocusEffect(
    useCallback(() => {
      populateOnyx();
    }, []),
  );

  const renderItem: ListRenderItem<Item> = useCallback(
    ({item}) => (
      <View style={styles.itemList}>
        <Button
          title={item.title}
          onPress={() => navigation.navigate(item.screen)}
        />
        <Text>{item.description}</Text>
      </View>
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
  },
  itemList: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});

export default Home;
