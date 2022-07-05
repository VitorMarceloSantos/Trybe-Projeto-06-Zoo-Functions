const data = require('../data/zoo_data');

function getEmployeeByName(Name) {
  if (Name === undefined) {
    return {}; // retorna objeto vazio
  }
  return data.employees.find((us) => ((us.firstName === Name) || (us.lastName === Name))); // retorna a busca pelo firstname ou lastname
}
// console.log(getEmployeeByName('Nigel'));

module.exports = getEmployeeByName;
