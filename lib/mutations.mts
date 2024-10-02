import { produce } from "immer";
import { Programme } from "../types/programme.mts";

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function twoRandomInts(max: number): [number, number] {
  const a = randomInt(max);
  let b = randomInt(max);
  while (b === a) {
    b = randomInt(max);
  }
  return [a, b];
}

// Splits a day's programme into two halves and swaps them
function swapInDay(programme: Programme): Programme {
  const dayIndex = randomInt(programme.length);
  const excercisesInDay = programme[dayIndex];
  const pivotIndex = randomInt(excercisesInDay.length);
  const head = excercisesInDay.slice(0, pivotIndex);
  const tail = excercisesInDay.slice(pivotIndex);
  return produce(programme, (draft) => {
    draft[dayIndex] = [...tail, ...head]; // reverse order around pivot point;
  });
}

// Reverses the order of excercises in a random day
function reverseDay(programme: Programme): Programme {
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
function moveBetweenDays(programme: Programme): Programme {
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
