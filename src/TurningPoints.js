export const findTurningPoints = (points) => {
    const keys = Object.keys(points);
    const coordinates = Object.values(points);
   
    if (coordinates.length < 3) return keys;
 
    const turningPoints = [keys[0]];
 
    for (let i = 1; i < coordinates.length - 1; i++) {
        const prev = coordinates[i - 1];
        const curr = coordinates[i];
        const next = coordinates[i + 1];
       
        if (prev.x !== next.x && prev.y !== next.y) {
            turningPoints.push(keys[i]);
        }
    }
 
    turningPoints.push(keys[keys.length - 1]);
    return turningPoints;
};