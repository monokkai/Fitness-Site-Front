import { ILevel } from "../interfaces/ILevel";
import { IWorkout } from "../interfaces/IWorkout";

export class LevelService {
    static async fetchLevelData(levelId: number, token: string): Promise<ILevel> {
        const workoutsResponse = await fetch(`${process.env.API_URL}/workouts`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!workoutsResponse.ok) throw new Error("Failed to fetch workouts");
        const workouts: IWorkout[] = await workoutsResponse.json();

        const levelWorkouts = LevelService.getWorkoutsForLevel(levelId, workouts);

        return {
            id: levelId,
            title: `Level ${levelId}`,
            description: LevelService.getLevelDescription(levelId),
            required_xp: (levelId - 1) * 100,
            workouts: levelWorkouts,
        };
    }

    private static getWorkoutsForLevel(level: number, workouts: IWorkout[]): IWorkout[] {
        const startIndex = (level - 1) * 3;
        return workouts.slice(startIndex, startIndex + 3);
    }

    private static getLevelDescription(level: number): string {
        const descriptions = [
            "Beginner exercises to start your journey",
            "Build fundamental strength and technique",
            "Intermediate challenges for progression",
            "Advanced workouts for mastery",
            "Expert level for peak performance",
        ];
        return descriptions[level - 1] || `Level ${level} training`;
    }
}
