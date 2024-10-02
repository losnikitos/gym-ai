import readTsv from "./read-tsv.mjs";
import type { DayProgramme, Programme } from "../types/programme.mts";

async function getInitialProgramme(): Promise<Programme> {
  const data = (await readTsv("./data/exercises.tsv")) as DayProgramme;
  return [data, [], []]; // at start put all excercises into day 1
}

export default getInitialProgramme;
