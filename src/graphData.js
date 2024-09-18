import PriorityQueue from "./PriorityQueue";

export const graph = { 
    'BK' : {'BF' : 5},
    'BJ' : {'BF' : 4},
    'BI' : {'BF' : 3},
    'BG' : {'BF' : 2},
    'BH' : {'BF' : 1},
    'BF' : {'B' : 2.7, 'BG' : 1, 'BH' : 2, 'BI' : 3, 'BJ' : 4, 'BK' : 5},
    'BE' : {'B' : 5},
    'BD' : {'B' : 4},
    'BC' : {'B' : 3},
    'BB' : {'B' : 2},
    'BA' : {'B' : 1},
    'B' : {'BF' : 2.7, 'D' : 1, 'CA' : 2, 'BA' : 1, 'BB' : 2, 'BC' : 3, 'BD' : 4, 'BE' : 5},
    'CA' : {'B' : 2, 'CC' : 1, 'CB' : 1, 'CF' : 2, 'CD' : 1, 'CE' : 2, 'CG' : 2},
    'CB' : {'CA' : 1},
    'CG' : {'CA' : 2},
    'CF' : {'CA' : 2},
    'CE' : {'CA' : 2},
    'CD' : {'CA' : 1},
    'CC' : {'CA' : 1},
    'D' : {'B' : 1, 'F' : 2, 'DA' : 1, 'DB' : 2, 'DC' : 1},
    'DA' : {'D' : 1},
    'DB' : {'D': 2},
    'DC': {'D' : 3},
    'F' : {'G' : 2, 'D' : 2, 'AA' : 1.3},
    'G' : {'F' : 2},
    'AA' : {'F' : 1.3, 'H' : 1.2},
    'H' : {'AA' : 1.3, 'AB' : 1, 'HA' : 1},
    'HA' : {'H' : 1, 'HH' : 1, 'HG' : 4, 'HC' : 4, 'HF' : 4, 'HE' : 2, 'HD' : 1, 'HB' : 2},
    'HH' : {'HA' : 1},
    'HB' : {'HA' : 2},
    'HG' : {'HA' : 4},
    'HC' : {'HA' : 4},
    'HF' : {'HA' : 4},
    'HE' : {'HA' : 2},
    'HD' : {'HA' : 1},
    'AB' : {'H' : 1, 'AC' : 1},
    'AC' : {'AB' : 1, 'AD' : 1},
    'AD' : {'AC' : 1, 'J' : 1},
    'J' : {'AD' : 1, 'AE' : 1.3, 'JA' : 1, 'JB' : 2, 'JC' : 3},
    'JA' : {'J' : 1},
    'JB' : {'J' : 2},
    'JC' : {'J' : 3},
    'AE' : {'J' : 1.3, 'L' : 1.5},
    'L' : {'AE' : 1.5, 'AF' : 1, 'LA' : 1, 'LB' : 2, 'LC' : 3},
    'LA' : {'L' : 1},
    'LB' : {'L' : 2},
    'LC' : {'L' : 3},
    'AF' : {'L' : 1, 'N' : 1},
    'N' : {'O' : 2, 'AF' : 1, 'P' : 1.5},
    'O' : {'N' : 2},
    'P' : {'N' : 1.5, 'AG' : 1.3, 'PA' : 1, 'PB' : 2, 'PC' : 3},
    'PA' : {'P' : 1},
    'PB' : {'P' : 2},
    'PC' : {'P' : 3},
    'AG' : {'P' : 1.3, 'R' : 1.3},
    'R': {'AG' : 1.3, 'RD' : 1, 'AH' : 1, 'RA' : 1, 'RB' : 2, 'RC' : 3},
    'RA' : {'R' : 1},
    'RB' : {'R' : 2},
    'RC' : {'R' : 3},
    'RD' : {'R' : 1, 'RE' : 1, 'RH' : 4, 'RF' : 2, 'RI' : 1, 'RG' : 4, 'RK' : 4, 'RL' : 2, 'RJ' : 1},
    'RE' : {'RD' : 1},
    'RH' : {'RD' : 4},
    'RF' : {'RD' : 2},
    'RI' : {'RD' : 1},
    'RG' : {'RD' : 4},
    'RK' : {'RD' : 4},
    'RL' : {'RD' : 2},
    'RJ' : {'RD' : 1},
    'AH' : {'R' : 1, 'AI' : 1},
    'AI' : {'AH' : 1, 'T' : 1},
    'T' : {'AI' : 1, 'TD' : 1, 'W' : 2, 'TA' : 1, 'TB' : 2, 'TC' : 3},
    'TA' : {'T' : 1},
    'TB' : {'T' : 2},
    'TC' : {'T' : 3},
    'TD' : {'T' : 1, 'TE' : 1, 'TF' : 2, 'TG' : 3, 'TH' : 4, 'TI' : 2, 'TJ' : 2, 'TK' : 3, 'TL' : 4, 'TM' : 5 , 'TN' : 6},
    'TE' : {'TD' : 1},
    'TF' : {'TD' : 2},
    'TG' : {'TD' : 3},
    'TH' : {'TD' : 4},
    'TI' : {'TD' : 3},
    'TJ' : {'TD' : 2},
    'TK' : {'TD' : 3},
    'TL' : {'TD' : 4},
    'TM' : {'TD' : 5},
    'TN' : {'TD' : 6},
    'W' : {'T' : 2, 'WA' : 1, 'WB' : 2, 'WC' : 3},
    'WA' : {'W' : 1},
    'WB' : {'W' : 2},
    'WC' : {'W' : 3},
};

export const coordinates = {
    "AA" : [-7.2, 0],
    "D": [-10.5, 0],
    "DA": [-10.5, -1],
    "DB": [-10.5, -2],
    "DC": [-10.5, -3],
    "F": [-8.5, 0],
    "G" : [-8.5, -2],
    "B": [-11.5, 0],
    "BA": [-11.5, -1],
    "BB": [-11.5, -2],
    "BC": [-11.5, -3],
    "BD": [-11.5, -4],
    "BE": [-11.5, -5],
    "BF": [-13.7, 0],
    "BG": [-13.7, -1],
    "BH": [-13.7, -2],
    "BI": [-13.7, -3],
    "BJ": [-13.7, -4],
    "BK": [-13.7, -5],
    "CA": [-11.5, 2],
    "CB": [-12.5, 2],
    "CC": [-10.5, 2],
    "CD": [-10.5, 3],
    "CE": [-10.5, 4],
    "CF": [-11.5, 4],
    "CG": [-13.5, 4],
    "H": [-6, 0],
    "HA": [-6, 1],
    "HB": [-6, 2],
    "HC": [-6, 3],
    "HD": [-5, 1],
    "HE": [-5, 2],
    "HF": [-5, 3],
    "HG": [-7.5, 3],
    "HH": [-7.5, 1],
    "J": [-2.5, 0],
    "JA": [-2.5, 2],
    "JB": [-2.5, 3],
    "JC": [-2.5, 3.5],
    "L": [0, 0],
    "LA": [0, 2],
    "LB": [0, 3],
    "LC": [0, 3.5],
    "P": [3.5, 0],
    "PA": [3.5, 2],
    "PB": [3.5, 3],
    "PC": [3.5, 3.5],
    "R": [6, 0],
    "RA": [6, 2],
    "RB": [6, 3],
    "RC": [6, 3.5],
    "RD": [6, -1],
    "RE": [6, -2],
    "RF": [6, -3],
    "RG": [6, -4],
    "RH": [7, -4],
    "RI": [7, -2],
    "RJ": [5, -2],
    "RK": [5, -4],
    "RL": [5, -3],
    "T": [8.5, 0],
    "TA": [8.5, 2],
    "TB": [8.5, 3],
    "TC": [8.5, 3.5],
    "TD": [8.5, -1],
    "TE": [8.5, -2],
    "TF": [8.5, -3],
    "TG": [8.5, -4],
    "TH": [8.5, -5],
    "TI": [9.5, -1],
    "TJ": [10.5, -1],
    "TK": [10.5, -2],
    "TL": [10.5, -3],
    "TM": [10.5, -4],
    "TN": [10.5, -5],
    "W": [10.5, 0],
    "WA": [10.5, 2],
    "WB": [10.5, 3],
    "WC": [10.5, 3.5],
    "AB": [-5.5, 0],
    "AC": [-4.5, 0],
    "AD": [-3.5, 0],
    "AE": [-1.3, 0],
    "AF": [1.7, 0],
    "AG": [4.7, 0],
    "AH": [7, 0],
    "AI": [8, 0],
    "N" : [2,0],
    "O" :[2,-2]
};

export const dijkstra = (graph, start, end) => {
    const queue = new PriorityQueue();
    queue.enqueue(0, start);
    const distances = Object.fromEntries(Object.keys(graph).map(key => [key, Infinity]));
    distances[start] = 0;
    const shortestPath = {};

    while (!queue.isEmpty()) {
        const { priority: currentDistance, key: currentNode } = queue.dequeue();

        if (currentDistance > distances[currentNode]) continue;

        for (const [neighbor, weight] of Object.entries(graph[currentNode])) {
            const distance = currentDistance + weight;
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                queue.enqueue(distance, neighbor);
                shortestPath[neighbor] = currentNode;
            }
        }
    }

    const path = [];
    let currentNode = end;
    while (currentNode !== start) {
        path.unshift(currentNode);
        currentNode = shortestPath[currentNode] ?? start;
    }
    path.unshift(start);

    return [path, distances[end]];
};
  