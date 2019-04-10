const randomCount = (...counts) => {
  const [max, min = 0] = counts;
  return Math.floor(Math.random() * (max - min) + min);
};

const dateTranfer = (number) => new Date(number);

export {randomCount, dateTranfer};
