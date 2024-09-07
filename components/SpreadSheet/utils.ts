const STARTING_LETTER_CODE = 65; // 'A' code
const ENDING_LETTER_CODE = 90; // 'Z' code

export const solveLetterHeader = (index: number) => {
  const indexRange = ENDING_LETTER_CODE - STARTING_LETTER_CODE + 1;

  let letterHeader = "";

  if (index + 1 > indexRange) {
    const exceedCount = Math.floor(index / indexRange);

    letterHeader += solveLetterHeader(exceedCount - 1);

    letterHeader += String.fromCharCode(
      STARTING_LETTER_CODE + index - exceedCount * indexRange
    );
  } else {
    letterHeader += String.fromCharCode(index + STARTING_LETTER_CODE);
  }

  return letterHeader;
};
