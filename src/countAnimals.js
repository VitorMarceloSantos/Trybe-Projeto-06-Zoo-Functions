const data = require('../data/zoo_data');

function countAnimalsUndefined(objParametro) {
  for (let i = 0; i < data.species.length; i += 1) { // foi utilizado o for, pois o mesmo ao encontrar o nome do animal encerra a busca e retorna a quantidae, o forEach teria que terminar o laço por todos os objetos
    if (data.species[i].name === objParametro.specie) {
      return Object.keys(data.species[i].residents).length;
    }
  }
}

function countFemale(objParametro) {
  const temp = data.species.filter((objAnimal) => objAnimal.name === objParametro.specie);
  return (temp[0].residents.filter((genero) => genero.sex === objParametro.sex)).length;
}

function countAnimals(objParametro) { // sex recebe um defalt parametro, caso não seja passado nenhum parâmetro
  const objAnimals = {};
  if (objParametro === undefined) {
    data.species.forEach((elemento) => {
      objAnimals[elemento.name] = Object.keys(elemento.residents).length;
    });
    return objAnimals;
  }
  if (objParametro.sex === undefined) { // não passou o sexo como parâmetro
    return countAnimalsUndefined(objParametro);
  }
  return countFemale(objParametro); // só vai se executada caso o sex seja definido no parâmetro
}
// console.log(countAnimals({ specie: 'bears', sex: 'female' }));
module.exports = countAnimals;

// Utilizando o forEach
// let contador = 0;
// data.species.forEach((elemento) => {
//   if (elemento.name === animal) {
//     contador = Object.keys(elemento.residents).length;
//   }
// });
// return contador;
