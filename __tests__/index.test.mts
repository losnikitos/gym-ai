import { expect, test } from "vitest";
import getInitialProgramme from "../lib/programme.mts";

test("Get programme", async () => {
  const programme = await getInitialProgramme();
  expect(programme).toBeDefined();
  expect(programme).toBeInstanceOf(Array);
  expect(programme.length).toBe(3);
  console.log(programme);
});
