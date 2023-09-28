import React, {useCallback} from 'react';
import {Button, FlatList, ListRenderItem, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../stacks/root';

type ScreenName = keyof RootStackParamList;

interface Item {
  title: string;
  screen: ScreenName;
}

// List experiments here
const data: Item[] = [{screen: 'Home', title: 'Long FlatList'}];

const keyExtractor = (item: Item) => item.title;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: Props) {
  const renderItem: ListRenderItem<Item> = useCallback(
    ({item}) => (
      <Button
        title={item.title}
        onPress={() => navigation.navigate(item.screen)}
      />
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
});

export default Home;
