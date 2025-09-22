import { useState } from "react";
import { WorkoutService } from "../services/workoutService";


export const useWorkoutCompletion = (userId: number) => {
    const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
    const [totalXP, setTotalXP] = useState(0);
    const [loading, setLoading] = useState(false);

    const completeWorkout = async (workoutId: number, completionTime: number) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("session_token");
            if (!token) throw new Error("No authentication token");

            await WorkoutService.completeWorkout(userId, workoutId, completionTime, token);

            setCompletedWorkouts(prev => [...prev, workoutId]);
            setTotalXP(prev => prev + 10);

            return true;
        } catch (error) {
            console.error("Workout completion error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { completedWorkouts, totalXP, loading, completeWorkout };
}
