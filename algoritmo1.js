const d1 = [
  [6, 7],
  [0, 2],
  [3, 4],
  [1, 5],
  [2, 6],
  [5, 7],
  [4, 6],
  [5, 6],
];

const parseData = (data) => {
  const obj = {};
  data.forEach((item) => {
    const dependencia = item[0];
    const dependente = item[1];

    obj[dependencia] = obj[dependencia] || {};
    obj[dependente] = obj[dependente] || {};

    obj[dependencia].dependentes = obj[dependencia].dependentes || [];
    obj[dependente].dependencias = obj[dependente].dependencias || [];

    obj[dependencia].dependentes.push(dependente);
    obj[dependente].dependencias.push(dependencia);
  });
  return obj;
};

const carregaProximos = (data, ordem = []) => {
  const carregados = [];
  Object.keys(data).forEach((key) => {
    // se não tiver dependencias, carrega o módulo
    if (!data[key].dependencias) {
      carregados.push(Number(key));
      // atualiza os elementos que dependem deste módulo
      if (data[key].dependentes) {
        data[key].dependentes.forEach((d) => {
          // remove o item que foi carregado da lista de dependencias
          const i = data[d].dependencias.indexOf(Number(key));
          data[d].dependencias.splice(i, 1);
        });
      }
      // remove objeto que foi carregado
      delete data[key];
    }
  });

  if (carregados.length > 0) ordem.push(carregados);
  else throw new Error('Grafo possui dependencias circulares.');
};

const limpaDependenciasVazias = (data) => {
  Object.keys(data).forEach((key) => {
    const { dependencias } = data[key];
    if (dependencias && dependencias.length === 0) delete data[key].dependencias;
  });
};

const determinaOrdem = (dataset) => {
  const ordem = [];
  const data = parseData(dataset);
  
  while (Object.keys(data).length > 0) {
    carregaProximos(data, ordem);
    limpaDependenciasVazias(data);
  }
  return ordem;
}

const printaOrdem = (ordem) => {
  ordem.forEach((item) => {
    console.log(item.join(' - '));
  })
};

printaOrdem(determinaOrdem(d1));
