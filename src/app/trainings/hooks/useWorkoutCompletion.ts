import { useState, useCallback } from "react";
import { useAuth } from "../../shared/context/authContext";
import { TRAINING_URL } from "@/app/shared/config/api.config";

interface UseWorkoutCompletionProps {
  levelId: number;
  levelData: any;
}

export const useWorkoutCompletion = ({ levelId, levelData }: UseWorkoutCompletionProps) => {
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const { user } = useAuth();

  const completeWorkout = useCallback(async (totalTime: number) => {
    if (!levelData || !user) return;

    const currentWorkout = levelData.workouts[currentWorkoutIndex];
    if (!currentWorkout) return;

    const newCompletedWorkouts = [...completedWorkouts, currentWorkout.id];
    setCompletedWorkouts(newCompletedWorkouts);

    if (newCompletedWorkouts.length === levelData.workouts.length) {
      const xpGained = levelData.required_xp || 100;
      setEarnedXP(xpGained);
      
      try {
        const token = localStorage.getItem("token");
        const requestData = {
          userId: user.id,
          level: levelId,
          completionTime: totalTime,
          score: 100,
        };
        
        console.log("Sending XP update request:", requestData);
        console.log("API URL:", `${TRAINING_URL}/user-levels/complete`);
        
        const response = await fetch(`${TRAINING_URL}/user-levels/complete`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        
        const responseText = await response.text();
        console.log("Response status:", response.status);
        console.log("Response text:", responseText);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`);
        }
        
        console.log("XP updated successfully");
      } catch (error) {
        console.error("Failed to update XP:", error);
        alert(`Failed to update XP: ${error}`);
      }
      
      setShowCompletion(true);
    } else {
      setCurrentWorkoutIndex(currentWorkoutIndex + 1);
    }
  }, [levelData, user, currentWorkoutIndex, completedWorkouts, levelId]);

  const resetProgress = useCallback(() => {
    setCompletedWorkouts([]);
    setCurrentWorkoutIndex(0);
    setShowCompletion(false);
    setEarnedXP(0);
  }, []);

  return {
    completedWorkouts,
    currentWorkoutIndex,
    showCompletion,
    earnedXP,
    completeWorkout,
    resetProgress,
    setCurrentWorkoutIndex,
  };
};