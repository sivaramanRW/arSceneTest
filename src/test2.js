function rotatePoint(x, y, angle) {
    // Convert angle from degrees to radians
    const rad = (Math.PI / 180) * angle;
    const newX = x * Math.cos(rad) - y * Math.sin(rad);
    const newY = x * Math.sin(rad) + y * Math.cos(rad);
    return [newX, newY];
}

function adjustPath(path, actualAngle) {
    const targetAngle = 70;
    const adjustmentAngle = targetAngle - actualAngle;

    return path.map(([x, y]) => {
        const [adjustedX, adjustedY] = rotatePoint(x, y, adjustmentAngle);
        return [adjustedX, adjustedY];
    });
}

function calculateDifference(originalPath, adjustedPath) {
    const differences = [];
    const correctedPath = [];

    for (let i = 0; i < originalPath.length; i++) {
        const [origX, origY] = originalPath[i];
        const [adjX, adjY] = adjustedPath[i];

        const diffX = origX - adjX;
        const diffY = origY - adjY;
        const correctedX = adjX + diffX;
        const correctedY = adjY + diffY;

        correctedPath.push([correctedX, correctedY]);

        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
        differences.push(distance);

        console.log(`Original: (${origX.toFixed(2)}, ${origY.toFixed(2)}), Adjusted: (${adjX.toFixed(2)}, ${adjY.toFixed(2)}), Difference: (${diffX.toFixed(2)}, ${diffY.toFixed(2)}), Distance: ${distance.toFixed(2)}`);
    }

    return correctedPath;
}

const originalPath = [[0, 0], [0, -3], [-14.5, -3], [-14.5, -1]];
const cameraAngles = [290];

cameraAngles.forEach(angle => {
    const adjustedPath = adjustPath(originalPath, angle);
    const correctedPath = calculateDifference(originalPath, adjustedPath);

    originalPath.forEach((orig, index) => {
        const corr = correctedPath[index];
        console.log(`${orig} -> ${corr}`);
    });
});
