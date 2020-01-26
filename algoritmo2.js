const grafo = {
  '0': { '1': 2, '4': 3 },
  '1': { '0': 2, '3': 8, '5': 9, '6': 6 },
  '2': { '5': 3, '6': 7 },
  '3': { '1': 8, '7': 6 },
  '4': { '0': 3, '6': 5, '7': 9 },
  '5': { '1': 9, '2': 3, '6': 4, '7': 5 },
  '6': { '1': 6, '2': 7, '4': 5, '5': 4 },
  '7': { '3': 6, '4': 9, '5': 5 },
};

const inicializaVariaveis = (grafo) => {
  const resultadoObj = {};
  const naoVisitados = [];
  Object.keys(grafo).forEach((key) => {
    naoVisitados.push(Number(key));
    resultadoObj[key] = {
      visitado: false,
      total: key === '0' ? 0 : Number.MAX_SAFE_INTEGER,
      caminho: '0',
    }
  });
  return { resultadoObj, naoVisitados };
}

const proximoNo = (obj) => {
  let min = Number.MAX_SAFE_INTEGER;
  let proximo = -1;
  Object.keys(obj).forEach((key) => {
    if (!obj[key].visitado && obj[key].total < min) {
      min = obj[key].total;
      proximo = key;
    }
  });
  return proximo;
};

const printaResultado = (resultado) => {
  Object.keys(resultado).forEach((key) => {
    const formatado = `Vertex, Cost, Path -> ${key}, ${resultado[key].total}, ${resultado[key].caminho}`;
    console.log(formatado);
  });
};

const dijkstra = (grafo) => {
  const { resultadoObj, naoVisitados } = inicializaVariaveis(grafo);
  let atual = 0;
  while (naoVisitados.length > 0) {
    // remove no atual da lista de nao visitados
    naoVisitados.splice(naoVisitados.indexOf(atual), 1);
    resultadoObj[atual].visitado = true;

    // atualiza os custos e caminhos para os nos nao visitados
    Object.keys(grafo[atual]).forEach((key) => {
      if (
        !resultadoObj[key].visitado
        && resultadoObj[atual].total + grafo[atual][key] < resultadoObj[key].total
      ) {
        resultadoObj[key].total = resultadoObj[atual].total + grafo[atual][key];
        resultadoObj[key].caminho = resultadoObj[atual].caminho + '-' + key;
      }
    });

    // calcula o proximo no a ser visitado
    atual = proximoNo(resultadoObj);
  }

  printaResultado(resultadoObj);
};

dijkstra(grafo);
