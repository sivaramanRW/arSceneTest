export const coordinates = {
    "AA" : [-7.2, 0],"D": [-10.5, 0],
    "DA": [-10.5, -1],"DB": [-10.5, -2],
    "DC": [-10.5, -3],"F": [-8.5, 0],
    "G" : [-8.5, -2],"B": [-11.5, 0],
    "BA": [-11.5, -1],"BB": [-11.5, -2],
    "BC": [-11.5, -3],"BD": [-11.5, -4],
    "BE": [-11.5, -5],"BF": [-13.7, 0],
    "BG": [-13.7, -1],"BH": [-13.7, -2],
    "BI": [-13.7, -3],"BJ": [-13.7, -4],
    "BK": [-13.7, -5],"CA": [-11.5, 2],
    "CB": [-12.5, 2],"CC": [-10.5, 2],
    "CD": [-10.5, 3],"CE": [-10.5, 4],
    "CF": [-11.5, 4],"CG": [-13.5, 4],
    "H": [-6, 0],"HA": [-6, 1],
    "HB": [-6, 2],"HC": [-6, 3],
    "HD": [-5, 1],"HE": [-5, 2],
    "HF": [-5, 3],"HG": [-7.5, 3],
    "HH": [-7.5, 1],"J": [-2.5, 0],
    "JA": [-2.5, 2],"JB": [-2.5, 3],
    "JC": [-2.5, 3.5],"L": [0, 0],
    "LA": [0, 2],"LB": [0, 3],
    "LC": [0, 3.5],"P": [3.5, 0],
    "PA": [3.5, 2],"PB": [3.5, 3],
    "PC": [3.5, 3.5],"R": [6, 0],
    "RA": [6, 2],"RB": [6, 3],
    "RC": [6, 3.5],"RD": [6, -1],
    "RE": [6, -2],"RF": [6, -3],
    "RG": [6, -4],"RH": [7, -4],
    "RI": [7, -2],"RJ": [5, -2],
    "RK": [5, -4],"RL": [5, -3],
    "T": [8.5, 0],"TA": [8.5, 2],
    "TB": [8.5, 3],"TC": [8.5, 3.5],
    "TD": [8.5, -1],"TE": [8.5, -2],
    "TF": [8.5, -3],"TG": [8.5, -4],
    "TH": [8.5, -5],"TI": [9.5, -1],
    "TJ": [10.5, -1],"TK": [10.5, -2],
    "TL": [10.5, -3],"TM": [10.5, -4],
    "TN": [10.5, -5],"W": [10.5, 0],
    "WA": [10.5, 2],"WB": [10.5, 3],
    "WC": [10.5, 3.5],"AB": [-5.5, 0],
    "AC": [-4.5, 0],"AD": [-3.5, 0],
    "AE": [-1.3, 0],"AF": [1.7, 0],
    "AG": [4.7, 0],"AH": [7, 0],
    "AI": [8, 0],"N" : [2,0],
    "O" :[2,-2]
};

let iniPos = '';

export const TrackPointsConvert = (startPoint) => {

    iniPos = startPoint;
    const [startX, startY] = coordinates[startPoint];
    const convertedCoordinates = {};

    for (const point in coordinates) {
        const [x, y] = coordinates[point];
        const newX = x - startX;
        const newY = y - startY;
        convertedCoordinates[point] = [newX, newY];
    }

    return convertedCoordinates;
};

export const findClosestPoint = (convertedCoords, randomCoord) => {
    let closestPoint = null;
    let closestDistance = Infinity;
    const threshold = 0.2;

    console.log('random point', randomCoord);
    console.log('initial pos', iniPos);

    for (const point in convertedCoords) {
        const [x, y] = convertedCoords[point];
        const [randX, randY] = randomCoord;

        const distance = Math.sqrt(Math.pow(x - randX, 2) + Math.pow(y - randY, 2));

        if (distance < closestDistance) {
            closestDistance = distance;
            closestPoint = point;
        }
    }

    if (closestPoint) {
        iniPos = closestPoint;
        return iniPos;
    }else{
        return iniPos;
    }
};



// export const findClosestPoint = (convertedCoords, randomCoord) => {
//     let closestPoint = null;
//     let closestDistance = Infinity;

//     console.log('random point', randomCoord);

//     for (const point in convertedCoords) {
//         const [x, y] = convertedCoords[point];
//         const [randX, randY] = randomCoord;

//         const distance = Math.sqrt(Math.pow(x - randX, 2) + Math.pow(y - randY, 2));

//         if (distance < closestDistance) {
//             closestDistance = distance;
//             closestPoint = point;
//         }
//     }
    
//     return closestPoint;
// };