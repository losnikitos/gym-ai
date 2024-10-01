import { produce } from "immer";

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function twoRandomInts(max) {
  const a = randomInt(max);
  let b = randomInt(max);
  while (b === a) {
    b = randomInt(max);
  }
  return [a, b];
}

// Splits a day's programme into two halves and swaps them
function swapInDay(programme) {
  const dayIndex = randomInt(programme.length);
  const excercisesInDay = programme[dayIndex];
  const pivotIndex = randomInt(excercisesInDay.index);
  const head = excercisesInDay.slice(0, pivotIndex);
  const tail = excercisesInDay.slice(pivotIndex);
  return produce(programme, (draft) => {
    draft[dayIndex] = [...tail, ...head]; // reverse order around pivot point;
  });
}

// Reverses the order of excercises in a random day
function reverseDay(programme) {
  const dayIndex = randomInt(programme.length);
  const excercisesInDay = programme[dayIndex];
  if (excercisesInDay.length === 0) {
    return programme;
  }

  return produce(programme, (draft) => {
    draft[dayIndex] = excercisesInDay.reverse();
  });
}

// Move a random excercise from a random day to another random day
function moveBetweenDays(programme) {
  const [fromDayIndex, toDayIndex] = twoRandomInts(programme.length);
  const fromDay = programme[fromDayIndex];
  const toDay = programme[toDayIndex];
  if (fromDay.length === 0) {
    return programme;
  }
  const excerciseIndex = randomInt(fromDay.length);
  const excercise = fromDay[excerciseIndex];
  const newFromDay = fromDay.filter((_, index) => index !== excerciseIndex);
  const newToDay = [...toDay, excercise];
  return produce(programme, (draft) => {
    draft[fromDayIndex] = newFromDay;
    draft[toDayIndex] = newToDay;
  });
}

export { swapInDay, reverseDay, moveBetweenDays };
export default [swapInDay, reverseDay, moveBetweenDays];
