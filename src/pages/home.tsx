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

type ScreenName = keyof RootStackParamList;

interface Item {
  title: string;
  screen: ScreenName;
  description: string;
}

// List experiments here
const data: Item[] = [
  {screen: 'Home', title: 'Long FlatList', description: 'Long FlatList'},
  {
    screen: 'JotaiOnyx',
    title: 'JotaiOnyx',
    description: 'We will use Jotai and Onyx to manage state',
  },
];

const keyExtractor = (item: Item) => item.title;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: Props) {
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
  },
});

export default Home;
