export const generateLabels = () => {
    const singleLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const doubleLetters = [];
   
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
            doubleLetters.push(String.fromCharCode(65 + i) + String.fromCharCode(65 + j));
        }
    }
   
    return [...singleLetters, ...doubleLetters];
}