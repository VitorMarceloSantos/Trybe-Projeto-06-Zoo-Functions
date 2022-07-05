const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  let arrayAnimal = [];
  // seleciona o id do animal correspondente ao id do colaborador
  const idAnimal = data.employees // quebra de linha em .filter
    .filter((colaborador) => (colaborador.id === id))[0].responsibleFor[0]; // o filter retorna um array com 1 posição [0] com o objeto com o coloborador correspondente, esse objeto é acessado em .responsibleFor na posição [0] que é o primeiro animal.
  // seleciona objeto animal correspondente ao id
  data.species.filter((elemento) => elemento.id === idAnimal).forEach((animal) => { // nesse forEach vai executar apenas 1 vez pois tem apenas 1 elemento, o array de retorno do filter
    let idadeTemp = 0; // armazena a maior idade
    animal.residents.forEach((idade) => {
      if (idade.age > idadeTemp) idadeTemp = idade.age;
    });
    arrayAnimal = Object.values(animal.residents.filter((selAni) => selAni.age === idadeTemp)[0]); // o filter vai tetornar um array com 1 elemento[0](utiliza o [0] para ter acesso as propriedades do objeto, pois assim acessando o array na posição [0] que é um objeto) que é o objeto correspondente ao animal mais velho, utiliza a propriedades do Object.value para pegar apenas os valores, sendo as keys descartadas.
  });
  return arrayAnimal;
}
// console.log(getOldestFromFirstSpecies('b0dc644a-5335-489b-8a2c-4e086c7819a2'));
module.exports = getOldestFromFirstSpecies;
