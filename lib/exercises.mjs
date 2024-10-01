import readTsv from "./read-tsv.mjs";
import { moveBetweenDays, swapInDay, reverseDay } from "./mutations.mjs";

const data = await readTsv("./data/exercises.tsv");

// at start put all excercises into day 1
const initialProgramme = [data, [], []];

const programme = reverseDay(initialProgramme);
console.log(programme);
