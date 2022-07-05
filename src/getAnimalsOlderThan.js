const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  return data.species
    .filter((elemento) => elemento.name === animal)[0] // seleciona o animal passado por parâmetro
    .residents.every((elemento) => elemento.age >= age); // o retorno do filter é um array de 1 elemento[index 0] com o elemento(objeto) encontrado
}
// console.log(getAnimalsOlderThan('otters', 7));

module.exports = getAnimalsOlderThan;
