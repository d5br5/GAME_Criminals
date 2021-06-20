function getRandomNumbers(total, size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    let randNum = Math.ceil(Math.random() * total);
    if (result.includes(randNum)) {
      i--;
    } else {
      result.push(randNum);
    }
  }
  for (let i = 0; i < size; i++) {
    result[i] = result[i].toString();
  }
  return result;
}

export {getRandomNumbers};