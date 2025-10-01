import { ILevel } from "../interfaces/ILevel";
import { IWorkout } from "../interfaces/IWorkout";
import { TRAINING_ENDPOINTS } from "@/app/shared/config/api.config";

export class LevelService {
    static async fetchLevelData(levelId: number, token: string): Promise<ILevel> {
        console.log('Fetching workouts from:', TRAINING_ENDPOINTS.WORKOUTS);
        
        const workoutsResponse = await fetch(TRAINING_ENDPOINTS.WORKOUTS, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Workouts response status:', workoutsResponse.status);
        
        if (!workoutsResponse.ok) {
            const errorText = await workoutsResponse.text();
            console.error('Workouts API error:', errorText);
            throw new Error(`Failed to fetch workouts: ${workoutsResponse.status}`);
        }
        
        let workouts: IWorkout[] = await workoutsResponse.json();
        console.log('Received workouts:', workouts);
        
        // If no workouts from API, use mock data
        if (!workouts || workouts.length === 0) {
            console.log('No workouts from API, using mock data');
            workouts = [
                {
                    id: 1,
                    title: "Push Ups",
                    description: "Basic exercise for chest muscles. Hands shoulder-width apart, keep your back straight.",
                    duration: 30,
                    difficulty: "easy",
                    category: "strength"
                },
                {
                    id: 2,
                    title: "Squats",
                    description: "Exercise for legs and glutes. Keep your back straight, squat until parallel to the floor.",
                    duration: 45,
                    difficulty: "medium",
                    category: "strength"
                },
                {
                    id: 3,
                    title: "Plank",
                    description: "Core strengthening exercise. Keep your body in a straight line.",
                    duration: 60,
                    difficulty: "medium",
                    category: "core"
                }
            ];
        }

        const levelWorkouts = LevelService.getWorkoutsForLevel(levelId, workouts);
        console.log('Level workouts for level', levelId, ':', levelWorkouts);

        return {
            id: levelId,
            title: `Level ${levelId}`,
            description: LevelService.getLevelDescription(levelId),
            required_xp: (levelId - 1) * 100,
            workouts: levelWorkouts,
        };
    }

    private static getWorkoutsForLevel(level: number, workouts: IWorkout[]): IWorkout[] {
        if (workouts.length === 0) return [];
        
        // For now, return all available workouts for each level
        // Later you can implement level-specific workout filtering
        return workouts;
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