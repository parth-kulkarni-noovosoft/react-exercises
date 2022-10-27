const notationMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
} as const

type RomanNotation = keyof typeof notationMap;

type StackElement = {
    count: number;
    val: RomanNotation 
}

/**
 * Returns the largest Notation that is smaller than the given Number
 * 
 * 12 -> X
 * 7 -> V
 * 3 -> I
 */
const getLargestNotation = (num: number) => {
    let largestNotation = '';
    for (const notation in notationMap) {
        if (num >= notationMap[notation as RomanNotation]) {
            largestNotation = notation;
        }
    }
    return largestNotation as RomanNotation;
}

/**
 * Returns the next greater notation
 * 
 * I -> V
 * V -> X
 * X -> L
 */
const nextOf = (notation: RomanNotation) => {
    if (notation === 'M') {
        throw new Error('No notation above M possible');
    }
    const notationKeys = Object.keys(notationMap);
    return notationKeys[notationKeys.indexOf(notation) + 1] as RomanNotation;
}

/**
 * Given a stack of StackElement reduces occurences of 4
 * of the same kind to fit the roman notation of smaller-larger 
 * 
 * IIII -> IV
 * VIIII -> IX
 */
const reduceOccurrences = (stack: StackElement[]) => {
    if (stack.length === 0) {
      return;
    }

    const last = stack.at(-1)!;
    for (let i = 0; i < last.count; i++) {
        stack.pop();
    }

    if (stack.at(-1)?.val === nextOf(last.val)) {
        const extra = stack.pop()!;
        stack.push({ val: last.val, count: 1 })
        stack.push({ val: nextOf(extra.val), count: 1 });
    } else {
        stack.push({ val: last.val, count: 1 })
        stack.push({ val: nextOf(last.val), count: 1 })
    }
}

/**
 * Returns the roman numeral version of a number
 * Accepted numbers are between 1 to 3999
 */
const convertToRomanNumeral = (num: number) => {
    if (num <= 0) {
        throw new Error('Numbers below 1 are not allowed')
    } else if (num > 3999) {
        throw new Error('Numbers above 3999 are not allowed');
    }

    const stack: StackElement[] = [];
    while (num > 0) {
        let largestNotation = getLargestNotation(num);
        num -= notationMap[largestNotation];

        if (stack.length === 0) {
            stack.push({ count: 1, val: largestNotation })
        } else {
            const lastIsSame = stack.at(-1)!.val === largestNotation;
            stack.push({
                count: lastIsSame ? stack.at(-1)!.count + 1 : 1,
                val: largestNotation
            })
        }

        if (stack.at(-1)!.count === 4) {
            reduceOccurrences(stack)
        }
    }
    return stack.map(e => e.val).join('');
}

for (let i = 1; i <= 3999; i++) console.log(convertToRomanNumeral(i))