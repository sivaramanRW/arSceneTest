export const TrackingPointsAdjust = (convertedCoords, angle) => {

    console.log('adjust angle', angle);

    const rotatedCoordinates = {};

    for (const point in convertedCoords) {
        const [x, y] = convertedCoords[point];

        const newX = x * Math.cos(angle) - y * Math.sin(angle);
        const newY = x * Math.sin(angle) + y * Math.cos(angle);

        rotatedCoordinates[point] = [newX, newY];
    }

    return rotatedCoordinates;
};