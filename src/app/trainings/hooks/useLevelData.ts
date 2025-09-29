import { useEffect, useState } from "react";
import { ILevel } from "../interfaces/ILevel";
import { LevelService } from "../services/levelService";


export const useLevelData = (levelId: number) => {
    const [levelData, setLevelData] = useState<ILevel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No authentication token");

                const data = await LevelService.fetchLevelData(levelId, token);
                setLevelData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load level");
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [levelId]);

    return { levelData, loading, error };
}
