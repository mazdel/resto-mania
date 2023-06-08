const itActAsFavoriteRestoModel = async (favoriteResto) => {
  it('should return the restaurant that has been added', async () => {
    await favoriteResto.put({ id: 1 });
    await favoriteResto.put({ id: 2 });

    expect(await favoriteResto.get(1)).toEqual({ id: 1 });
    expect(await favoriteResto.get(2)).toEqual({ id: 2 });
    expect(await favoriteResto.get(3)).toBeUndefined();
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    await favoriteResto.put({ aProperty: 'property' });

    expect(await favoriteResto.getAll()).toEqual([]);
  });

  it('can return all restaurants which have been added', async () => {
    await favoriteResto.put({ id: 1 });
    await favoriteResto.put({ id: 2 });

    expect(await favoriteResto.getAll()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove selected restaurants from list', async () => {
    await favoriteResto.put({ id: 1 });
    await favoriteResto.put({ id: 2 });
    await favoriteResto.put({ id: 3 });
    await favoriteResto.put({ id: 4 });

    await favoriteResto.delete(2);

    expect(await favoriteResto.getAll()).toEqual([
      { id: 1 },
      { id: 3 },
      { id: 4 },
    ]);
  });

  it('should handle removing a restaurants even though the restaurant has not been added', async () => {
    await favoriteResto.put({ id: 1 });
    await favoriteResto.put({ id: 2 });
    await favoriteResto.put({ id: 3 });

    await favoriteResto.delete(4);

    expect(await favoriteResto.getAll()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });
};
/* eslint import/prefer-default-export:"off" */
export { itActAsFavoriteRestoModel };
