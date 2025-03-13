// Función para dividir el conjunto de datos
function splitDataset(data, trainRatio = 0.8) {
    // Mezclar los datos para asegurar aleatoriedad
    data.sort(() => Math.random() - 0.5);

    // Calcular el tamaño del conjunto de entrenamiento
    const trainSize = Math.floor(data.length * trainRatio);

    // Dividir el conjunto de datos
    const trainSet = data.slice(0, trainSize);
    const testSet = data.slice(trainSize);

    return { trainSet, testSet };
}

// Ejemplo de uso
function main() {
    // Crear un conjunto de datos de ejemplo
    const data = Array.from({ length: 100 }, (_, i) => ({ x: i, y: i * 2, label: i % 2 }));

    // Dividir el conjunto de datos
    const { trainSet, testSet } = splitDataset(data, 0.7);

    // Mostrar resultados
    console.log("Conjunto de entrenamiento:", trainSet.length, "elementos");
    console.log("Conjunto de prueba:", testSet.length, "elementos");
}

// Ejecutar el programa
main();