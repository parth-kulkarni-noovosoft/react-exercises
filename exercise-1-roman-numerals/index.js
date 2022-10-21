const notationMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
}

const getLargestNotation = (num) => {
  let largestNotation = '';
  for (let notation in notationMap) {
    if (num >= notationMap[notation]) {
      largestNotation = notation;
    }
  }
  return largestNotation;
}

const nextOf = (notation) => {
  const notationKeys = Object.keys(notationMap);
  return notationKeys[notationKeys.indexOf(notation) + 1];
}

const reduceOccurrences = (stack) => {
  const last = stack.at(-1);
  for (let i = 0; i < last.count; i++) {
    stack.pop();
  }

  if (stack.at(-1)?.val === nextOf(last.val)) {
    const extra = stack.pop();
    stack.push({ val: last.val, count: 1 })
    stack.push({ val: nextOf(extra.val), count: 1 });
  } else {
    stack.push({ val: last.val, count: 1 })
    stack.push({ val: nextOf(last.val), count: 1 })
  }
}

const convertToRomanNumeral = (num) => {
  let stack = [];
  while (num > 0) {
    let lnotation = getLargestNotation(num);
    num -= notationMap[lnotation];

    if (stack.length === 0) {
      stack.push({ count: 1, val: lnotation })
    } else {
      const lastIsSame = stack.at(-1).val === lnotation;
      stack.push({
        count: lastIsSame ? stack.at(-1).count + 1 : 1,
        val: lnotation
      })
    }

    if (stack.at(-1).count === 4) {
      reduceOccurrences(stack)
    }
  }
  return stack.map(e => e.val).join('');
}

console.log(convertToRomanNumeral(3999))
