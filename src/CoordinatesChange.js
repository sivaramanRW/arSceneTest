export const CoordinatesChange = (originaldPath, cameradAngles) =>{
 
    const originalPath = originaldPath.map(({x, y}) => [x, y]);
    const cameraAngles = cameradAngles;
    console.log('OG',originalPath);
    console.log('angle',cameraAngles);
 
    const adjustedPath = adjustPath(originalPath, cameraAngles);
    const correctedPath = calculateDifference(originalPath, adjustedPath);
 
    function rotatePoint(x, y, angle) {
        const rad = (angle * Math.PI) / 180;
        const newX = x * Math.cos(rad) - y * Math.sin(rad);
        const newY = x * Math.sin(rad) + y * Math.cos(rad);
        return [newX, newY];
    }
   
    function adjustPath(path, actualAngle) {
        const targetAngle = 75;
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
            console.log(`Original: (${origX.toFixed(2)}, ${origY.toFixed(2)}), Adjusted: (${adjX.toFixed(2)}, ${adjY.toFixed(2)}), Difference: (${diffX.toFixed(2)}, ${diffY.toFixed(2)}), Distance: ${distance.toFixed(2)}`);
           
            return [correctedX, correctedY];
        });
       
        return correctedPath;
    }
    return adjustedPath;
}