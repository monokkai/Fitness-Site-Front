import { useEffect, useState } from "react"


export const useWorkoutTimer = (initialTime: number, onComplete: () => void) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            onComplete();
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete]);

    const start = () => setIsActive(true);
    const pause = () => setIsActive(false);

    const reset = (newTime?: number) => {
        setIsActive(false);
        setTimeLeft(newTime || initialTime);
    }

    return { timeLeft, isActive, start, pause, reset }
}
