export interface IUserProgress {
    userId: number;
    levelId: number;
    completedWorkouts: number[];
    totalXP: number;
    currentWorkoutIndex: number;
}
