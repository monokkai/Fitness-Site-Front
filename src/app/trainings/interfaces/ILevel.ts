import { IWorkout } from "./IWorkout";

export interface ILevel {
  id: number;
  title: string;
  description: string;
  required_xp: number;
  workouts: IWorkout[];
}

export interface ILevelProgress {
  completedWorkouts: number[];
  totalXP: number;
  currentWorkoutIndex: number;
}
