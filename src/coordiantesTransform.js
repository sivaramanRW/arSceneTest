let originalPoints = {
    
};

export const transformCoordinatesPath = (foundPoints, startPoint, endPoint) => {

    originalPoints = foundPoints;
    const startCoord = originalPoints[startPoint];
    const transformationVector = { x: -startCoord.x, y: -startCoord.y };

    const transformedPoints = {};
    for (const key in originalPoints) {
        transformedPoints[key] = {
            x: originalPoints[key].x + transformationVector.x,
            y: originalPoints[key].y + transformationVector.y
        };
    }

    const path = [startPoint];
    let currentPoint = startPoint;

    while (currentPoint !== endPoint) {
        let nextPoint = null;
        let minDistance = Infinity;

        for (const point in transformedPoints) {
            if (point !== currentPoint && !path.includes(point)) {
                const distanceToEnd = Math.sqrt(
                    Math.pow(transformedPoints[point].x - transformedPoints[endPoint].x, 2) +
                    Math.pow(transformedPoints[point].y - transformedPoints[endPoint].y, 2)
                );

                if (distanceToEnd < minDistance) {
                    minDistance = distanceToEnd;
                    nextPoint = point;
                }
            }
        }

        if (!nextPoint) break;

        path.push(nextPoint);
        currentPoint = nextPoint;
    }

    if (path[path.length - 1] !== endPoint) {
        path.push(endPoint);
    }

    return { transformedPoints, path };
};
