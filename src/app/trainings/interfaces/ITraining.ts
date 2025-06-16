import { FaDumbbell } from "react-icons/fa";

export interface TrainingCategory {
    id: string;
    title: string;
    description: string;
    progress: number;
    icon: typeof FaDumbbell;
    color: string;
}

export interface FeaturedWorkout {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: string;
    xp: number;
}

export interface PathNode {
    type: 'level' | 'story' | 'chest';
    level?: number;
    isCompleted?: boolean;
    isLocked?: boolean;
    difficulty?: "easy" | "medium" | "hard";
    xp?: number;
    exerciseCount?: number;
}
