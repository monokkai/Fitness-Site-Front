interface ProfileData {
    id: number;
    userId: number;
    age: number;
    weight: number;
    height: number;
    sex: string;
    trainingGoal: string;
    workoutsPerWeek: number;
    currentStreak: number;
    longestStreak: number;
    totalWorkouts: number;
    createdAt: string;
    updatedAt: string;
    goal: string | null;
}

export default ProfileData;
