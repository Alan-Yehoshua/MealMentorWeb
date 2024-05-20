export const makeArray = (start, end, type, event) => {
  const newArray = [];
  for (start; start < end; start++) {
    const Name = type + start;
    const value = event.target.elements[Name].value;
    newArray.push(value);
  }

  return newArray;
};
