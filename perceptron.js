// Generar 40 datos linealmente separables
function generateData(numPoints) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * 10;
        const y = Math.random() * 10;
        const label = y > x ? 1 : -1; // Separación lineal basada en y = x
        data.push({ x, y, label });
    }
    return data;
}

// Algoritmo del perceptrón
function trainPerceptron(data, learningRate = 0.1, epochs = 100) {
    let weights = [Math.random() * 2 - 1, Math.random() * 2 - 1]; // Pesos iniciales aleatorios
    let bias = Math.random() * 2 - 1; // Bias inicial aleatorio

    for (let epoch = 0; epoch < epochs; epoch++) {
        for (const point of data) {
            const prediction = weights[0] * point.x + weights[1] * point.y + bias;
            const predictedLabel = prediction >= 0 ? 1 : -1;

            // Actualizar pesos y bias si la predicción es incorrecta
            if (predictedLabel !== point.label) {
                const error = point.label - predictedLabel;
                weights[0] += learningRate * error * point.x;
                weights[1] += learningRate * error * point.y;
                bias += learningRate * error;
            }
        }
    }
    return { weights, bias };
}

// Graficar los puntos y la recta de separación
function plotDataAndLine(data, weights, bias) {
    const ctx = document.getElementById('perceptronChart').getContext('2d');

    // Preparar los datos para Chart.js
    const class1 = data.filter(point => point.label === 1);
    const class2 = data.filter(point => point.label === -1);

    const chartData = {
        datasets: [
            {
                label: 'Clase 1',
                data: class1.map(point => ({ x: point.x, y: point.y })),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointRadius: 5,
            },
            {
                label: 'Clase -1',
                data: class2.map(point => ({ x: point.x, y: point.y })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 5,
            },
        ],
    };

    // Crear el gráfico
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: chartData,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: 0,
                    max: 10,
                },
                y: {
                    min: 0,
                    max: 10,
                },
            },
            plugins: {
                annotation: {
                    annotations: {
                        line: {
                            type: 'line',
                            borderColor: 'green',
                            borderWidth: 2,
                            scaleID: 'y',
                            value: (ctx) => {
                                const x1 = 0;
                                const y1 = (-weights[0] * x1 - bias) / weights[1];
                                const x2 = 10;
                                const y2 = (-weights[0] * x2 - bias) / weights[1];
                                return { x1, y1, x2, y2 };
                            },
                        },
                    },
                },
            },
        },
    });
}

// Función principal
function main() {
    const data = generateData(40); // Generar 40 puntos
    const { weights, bias } = trainPerceptron(data); // Entrenar el perceptrón
    plotDataAndLine(data, weights, bias); // Graficar los datos y la recta
}

// Ejecutar el programa
main();