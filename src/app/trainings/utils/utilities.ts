export const generatePath = (
    index: number,
    isMobile: boolean
): { x: string; y: number } => {
    if (isMobile) {
        return {
            x: "50%",
            y: index * 200,
        };
    }

    const isAlternating = index % 2 === 1;
    return {
        x: isAlternating ? "65%" : "35%",
        y: index * 180,
    };
};

export const generateSvgPath = (isMobile: boolean): string => {
    if (isMobile) {
        return `M 50% 60 
              L 50% 1600`;
    }

    return `M 35% 60 
            L 35% 120
            C 35% 150, 65% 150, 65% 180
            L 65% 240
            C 65% 270, 35% 270, 35% 300
            L 35% 360
            C 35% 390, 65% 390, 65% 420
            L 65% 480
            C 65% 510, 35% 510, 35% 540
            L 35% 600
            C 35% 630, 65% 630, 65% 660
            L 65% 720`;
};