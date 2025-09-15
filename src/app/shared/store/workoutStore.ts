import { create } from "zustand";
import { FeaturedWorkout } from "../../trainings/interfaces/ITraining";

interface WorkoutState {
    workouts: FeaturedWorkout[];
    selectedWorkout: FeaturedWorkout | null;
    loading: boolean;
    setWorkouts: (workouts: FeaturedWorkout[]) => void;
    selectWorkout: (workout: FeaturedWorkout | null) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
    workouts: [],
    selectedWorkout: null,
    loading: true,
    setWorkouts: (workouts) => set({ workouts, loading: false }),
    selectWorkout: (workout) => set({ selectedWorkout: workout }),
}));
