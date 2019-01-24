let data = [
    {input: [4, 1], output: 1},
    {input: [4, 3], output: 1},
    {input: [4, 5], output: 1},
    {input: [4, 7], output: 1},
    {input: [4, 0], output: 0},
    {input: [4, 2], output: 0},
    {input: [4, 6], output: 0},
    {input: [4, 8], output: 0}
];
Ml(data);
console.log('-------------------'); 
for(let i = 0; i < 9; i+=2) {
    if (i == 4) continue;
    for (let j = 0; j < 9; j++) {
        if (i == j) continue;
        if (j == 4) data.push({input: [i, j], output: 0})
        else data.push({input: [i, j], output: 1})
    }
}
Ml(data);