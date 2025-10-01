export const getVideoUrl = (level: number, workoutId: number): string => {
  const baseUrl = process.env.NEXT_PUBLIC_NGINX_URL || 'http://localhost:80';
  return `${baseUrl}/media/${workoutId}_${workoutId}_video.mp4`;
};

export const checkVideoExists = async (videoUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(videoUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};