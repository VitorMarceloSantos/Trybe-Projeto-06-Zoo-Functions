const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) { // se receber mais de um parâmetro vai transformar em um array de string
  if (ids === undefined) {
    return []; // retorna um array vazio
  }
  const arrayAnimals = [];
  ids.forEach((elemento) => {
    arrayAnimals.push(data.species.find((animal) => animal.id === elemento)); // realiza a busca pelo id, e retorna o primeiro elemento correspondente
  });
  return arrayAnimals;
}
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

module.exports = getSpeciesByIds;
