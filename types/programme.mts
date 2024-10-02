export interface Exercise {
  excercise: string;
  primary_muscle: string;
  sets: number;
  reps: number;
}

export type DayProgramme = Exercise[];

export type Programme = DayProgramme[];
