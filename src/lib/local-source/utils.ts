function createRandomCollection<T>(
  createKey: (item: T) => string,
  createItem: (index: number) => T,
  length = 500,
) {
  const list = new Array(length)
    .fill(null)
    .map((_value, index) => createItem(index));

  return list.reduce<Record<string, T>>((acc, item) => {
    acc[createKey(item)] = item;
    return acc;
  }, {});
}

export {createRandomCollection};
