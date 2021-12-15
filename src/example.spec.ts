function addnum(x: number, y: number) {
  return x + y;
}

describe('addnum', () => {
  it('equals true', () => {
    expect(addnum(2, 2)).toEqual(4);
  });
});
