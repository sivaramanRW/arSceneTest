export const CoordinatesChange = (originaldPath, cameradAngles) =>{

    console.log('CoordinatesChange points', originaldPath);
    console.log('CoordinatesChange angle', cameradAngles);
    
    const originalPath = originaldPath.map(({x, y}) => [x, y]);
    const cameraAngles = cameradAngles;

    const adjustedPath = adjustPath(originalPath, cameraAngles);
    const correctedPath = calculateDifference(originalPath, adjustedPath);

    function rotatePoint(x, y, angle) {
        const rad = (angle * Math.PI) / 180;
        const newX = x * Math.cos(rad) - y * Math.sin(rad);
        const newY = x * Math.sin(rad) + y * Math.cos(rad);
        return [newX, newY];
    }
    
    function adjustPath(path, actualAngle) {
        const targetAngle = 80;
        const adjustmentAngle = targetAngle - actualAngle;
        const adjustedPath = path.map(([x, y]) => rotatePoint(x, y, adjustmentAngle));
        return adjustedPath;
    }
    
    function calculateDifference(originalPath, adjustedPath) {
        const differences = [];
        const correctedPath = originalPath.map(([origX, origY], index) => {
            const [adjX, adjY] = adjustedPath[index];
            const diffX = origX - adjX;
            const diffY = origY - adjY;
            const correctedX = adjX + diffX;
            const correctedY = adjY + diffY;
            const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
            
            differences.push(distance);
            return [correctedX, correctedY];
        });
        
        return correctedPath;
    }
    return adjustedPath;
}