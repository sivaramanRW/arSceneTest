export const TrackingPointsDegree = (originalPoints, cameraAngles) => {
  
    const adjustedPoints = adjustPoints(originalPoints, cameraAngles);
    
    function rotatePoint(x, y, angle) {
      const rad = (angle * Math.PI) / 180;
      const newX = x * Math.cos(rad) - y * Math.sin(rad);
      const newY = x * Math.sin(rad) + y * Math.cos(rad);
      return [newX, newY];
    }
    
    function adjustPoints(points, actualAngle) {
      const targetAngle = 80;
      const adjustmentAngle = targetAngle - actualAngle;
      const adjustedPoints = Object.entries(points).reduce((acc, [key, [x, y]]) => {
        acc[key] = rotatePoint(x, y, adjustmentAngle);
        return acc;
      }, {});
      return adjustedPoints;
    }
    
    return adjustedPoints;
    };