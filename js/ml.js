let defaultData = [
    {input: [0, 0], output: 0},
    {input: [1, 0], output: 1},
    {input: [0, 1], output: 1},
    {input: [1, 1], output: 0},
]; 
function Ml(data = defaultData) { 

    let random = () => Math.random();



    var activation_sigmoid = x => 1 / (1 + Math.exp(-x));
    var derivative_sigmoid = x => {
        const fx = activation_sigmoid(x);
        return fx * (1 - fx);
    };

    var weights = {
        i1_h1: random(),
        i2_h1: random(),
        bias_h1: random(),
        i1_h2: random(),
        i2_h2: random(),
        bias_h2: random(),
        h1_o1: random(),
        h2_o1: random(),
        bias_o1: random(),
    };

    function nn(i1, i2) {
        var h1_input =
            weights.i1_h1 * i1 +
            weights.i2_h1 * i2 +
            weights.bias_h1;
        var h1 = activation_sigmoid(h1_input);

        var h2_input =
            weights.i1_h2 * i1 +
            weights.i2_h2 * i2 +
            weights.bias_h2;
        var h2 = activation_sigmoid(h2_input);


        var o1_input =
            weights.h1_o1 * h1 +
            weights.h2_o1 * h2 +
            weights.bias_o1;

        var o1 = activation_sigmoid(o1_input);
        
        return o1;
    }

    var calculateResults = () =>
        console.log(R.mean(data.map(({input: [i1, i2], output: y}) => Math.pow(y - nn(i1, i2), 2))));

    var outputResults = () => 
        data.forEach(({input: [i1, i2], output: y}) => 
                    console.log(`${i1} AND ${i2} => ${nn(i1, i2)} (expected ${y})`));

    calculateResults();

    var train = () => {
        const weight_deltas = {
            i1_h1: 0,
            i2_h1: 0,
            bias_h1: 0,
            i1_h2: 0,
            i2_h2: 0,
            bias_h2: 0,
            h1_o1: 0,
            h2_o1: 0,
            bias_o1: 0,
        };
        
        for (var {input: [i1, i2], output} of data) {
            //это код, просто скопированный из функции выше - чтобы научить сеть, нужно сначала делать проход вперед
            var h1_input =
                weights.i1_h1 * i1 +
                weights.i2_h1 * i2 +
                weights.bias_h1;
            var h1 = activation_sigmoid(h1_input);

            var h2_input =
                weights.i1_h2 * i1 +
                weights.i2_h2 * i2 +
                weights.bias_h2;
            var h2 = activation_sigmoid(h2_input);


            var o1_input =
                weights.h1_o1 * h1 +
                weights.h2_o1 * h2 +
                weights.bias_o1;

            var o1 = activation_sigmoid(o1_input);

            //Обучение начинается:
            // мы расчитываем разницу
            var delta = output - o1;
            // затем берем производную (и выкидываем 2 *, потому что это нам не так важно)
            var o1_delta = delta * derivative_sigmoid(o1_input);

            //и для нашей формулы вида w1 * h1 + w2 * h2 мы вначале пытаемся обновить веса w1 и w2
            
            weight_deltas.h1_o1 += h1 * o1_delta;
            weight_deltas.h2_o1 += h2 * o1_delta;
            weight_deltas.bias_o1 += o1_delta;
            
            //А затем входные значения h1 и h2.
            //Мы не можем просто взять и изменить их - это выход такой же функции активации
            //Поэтому мы пропускаем эту ошибку дальше по тому же принципу
            
            var h1_delta = o1_delta * derivative_sigmoid(h1_input);
            var h2_delta = o1_delta * derivative_sigmoid(h2_input);
            
            weight_deltas.i1_h1 += i1 * h1_delta;
            weight_deltas.i2_h1 += i2 * h1_delta;
            weight_deltas.bias_h1 += h1_delta;
            
            weight_deltas.i1_h2 += i1 * h2_delta;
            weight_deltas.i2_h2 += i2 * h2_delta;
            weight_deltas.bias_h2 += h2_delta;        
        }

        return weight_deltas;
    }

    var applyTrainUpdate = (weight_deltas = train()) => 
        Object.keys(weights).forEach(key => 
                                    weights[key] += weight_deltas[key]);

    applyTrainUpdate();
    outputResults();
    calculateResults();

    R.times(() => applyTrainUpdate(), 100)
    outputResults();
    calculateResults();

    R.times(() => applyTrainUpdate(), 1000)
    outputResults();
    calculateResults();

    R.times(() => applyTrainUpdate(), 10000)
    outputResults();
    calculateResults();
}