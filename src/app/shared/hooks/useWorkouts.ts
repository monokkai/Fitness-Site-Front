import { useEffect } from "react";
import axios from "axios";
import { TRAINING_URL } from "../config/api.config";
import { useWorkoutStore } from "../store/workoutStore";

export default function useWorkouts() {
    const { setWorkouts } = useWorkoutStore();

    useEffect(() => {
        axios
            .get(`${TRAINING_URL}/workouts`)
            .then((res) => setWorkouts(res.data))
            .catch((err) => {
                console.error("Error loading workouts", err);
                setWorkouts([]);
            });
    }, [setWorkouts]);
}
