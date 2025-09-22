import { IWorkout } from '../interfaces/IWorkout';

export class WorkoutService {
    static async completeWorkout(
        userId: number,
        workoutId: number,
        completionTime: number,
        token: string
    ): Promise<void> {
        const xpReward = 10;

        const response = await fetch(`${process.env.API_URL}/user-workouts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                workoutId,
                completionTime,
                actualRepeats: 1,
                score: xpReward,
            }),
        });

        if (!response.ok) throw new Error("Failed to save workout completion");
    }
}
