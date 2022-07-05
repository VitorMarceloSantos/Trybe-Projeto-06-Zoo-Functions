const data = require('../data/zoo_data');

function isManager(id) { // verifica se a pessoa é gerente
  const arrayManager = []; // vai armazenar os ids dos gerentes
  data.employees.forEach((colaborador) => { // vai executar as o array Data 8 vezes, pois possui 8 objetos
    const temp = (colaborador.managers);
    if (arrayManager.length === 0) {
      arrayManager.push(...temp); // o arrayManager recebe o array temp destruturado (spread)
    } else {
      temp.forEach((elemento) => {
        if (arrayManager.every((gerente) => gerente !== elemento)) arrayManager.push(elemento); // caso seja true(every vai passar por todos os elementos  do arrayManager e verifica se o elemento temp já foi adicionado ao array, caso não seja vai retornar true e o if será executado)
      });
    }
  }); // for Each colaborador
  // return arrayManager; // retorna o array com todos os managers
  return (arrayManager.some((gerente) => gerente === id)); // retorna true or false, comparando com o id passado pelo usuário
}
// Gerentes
// const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
// const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
// const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';
// const Emery = 'b0dc644a-5335-489b-8a2c-4e086c7819a2';
// console.log(isManager());

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) { // caso seja false, será lançado o erro
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  try { // será executado caso não seja lançado o erro
    const arrayEmployees = []; // chamando a função
    data.employees.forEach((colab) => {
      const temp = colab.managers.find((manager) => manager === managerId); // caso retorne undefined o id passado pelo usuario não correponde a determinado colaborador.
      if (temp !== undefined) arrayEmployees.push(`${colab.firstName} ${colab.lastName}`); // retorna o elemento, caso o Id passado pelo usuario corresponde ao find
    }); // forEach
    return arrayEmployees;
  } catch (error) { // caso seja lançado o erro, será executado esta parte
    return error.message;
  }
}
// console.log(getRelatedEmployees('9e7d4524-363c-416a-8759-8aa7e50c0992'));

module.exports = { isManager, getRelatedEmployees };
