import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../shared/context/authContext";
import { API_URL } from "@/app/shared/config/api.config";

interface UseWorkoutTimerProps {
  levelData: any;
  onComplete: () => void;
}

export const useWorkoutTimer = ({ levelData, onComplete }: UseWorkoutTimerProps) => {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const { user } = useAuth();

  const completeWorkout = useCallback(async (workoutId: number) => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/user-workouts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          workoutId,
          completionTime: 60,
          actualRepeats: 1,
          score: 100
        })
      });
    } catch (error) {
      console.error("Failed to save workout completion:", error);
    }
  }, [user]);

  const updateUserStats = useCallback(async (totalXP: number, totalWorkouts: number) => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/user-profiles/${user.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          totalXP,
          totalWorkouts,
          currentLevel: Math.floor(totalXP / 100) + 1
        })
      });
    } catch (error) {
      console.error("Failed to update stats:", error);
    }
  }, [user]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      const currentWorkout = levelData?.workouts[currentWorkoutIndex];
      if (currentWorkout) {
        completeWorkout(currentWorkout.id);
        setCompletedWorkouts(prev => [...prev, currentWorkout.id]);
        
        if (currentWorkoutIndex < (levelData?.workouts.length || 0) - 1) {
          setCurrentWorkoutIndex(prev => prev + 1);
          setTimeLeft(60);
        } else {
          const totalXP = (levelData?.workouts.length || 0) * 50;
          const totalWorkouts = levelData?.workouts.length || 0;
          setEarnedXP(totalXP);
          updateUserStats(totalXP, totalWorkouts);
          setIsPlaying(false);
          setShowCompletion(true);
          onComplete();
        }
      }
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, currentWorkoutIndex, levelData, completeWorkout, updateUserStats, onComplete]);

  const startWorkout = () => {
    setTimeLeft(60);
    setIsPlaying(true);
  };

  const pauseWorkout = () => {
    setIsPlaying(false);
  };

  const stopWorkout = () => {
    setIsPlaying(false);
    setTimeLeft(60);
    setCurrentWorkoutIndex(0);
    setCompletedWorkouts([]);
  };

  const completeLevel = useCallback(async () => {
    if (!levelData?.workouts || !user) return;
    
    try {
      const token = localStorage.getItem("token");
      
      // Complete all workouts
      for (const workout of levelData.workouts) {
        await fetch(`${API_URL}/user-workouts`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            workoutId: workout.id,
            completionTime: 60,
            actualRepeats: 1,
            score: 100
          })
        });
      }
      
      // Update user level progress
      await fetch(`${API_URL}/user-level`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          levelId: levelData.id,
          isCompleted: true,
          completionDate: new Date().toISOString()
        })
      });
      
      const earnedXP = levelData.workouts.length * 50;
      
      // Update user profile with new XP and stats
      await fetch(`${API_URL}/user-profiles/${user.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          totalXP: earnedXP,
          totalWorkouts: levelData.workouts.length,
          currentLevel: levelData.id + 1
        })
      });
      
      setCompletedWorkouts(levelData.workouts.map((w: any) => w.id));
      setEarnedXP(earnedXP);
      setIsPlaying(false);
      setShowCompletion(true);
      onComplete();
      
    } catch (error) {
      console.error("Failed to complete level:", error);
    }
  }, [levelData, user, onComplete]);

  return {
    currentWorkoutIndex,
    isPlaying,
    timeLeft,
    completedWorkouts,
    showCompletion,
    earnedXP,
    startWorkout,
    pauseWorkout,
    stopWorkout,
    completeLevel
  };
};