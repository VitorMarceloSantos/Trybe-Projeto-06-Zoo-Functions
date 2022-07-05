const data = require('../data/zoo_data');

function nameId(arrayColab, objColab) {
  arrayColab.responsibleFor.forEach((animal) => { // vai transformar o id(referente ao animal) em seu nome (array species)
    data.species.forEach((nome) => { // HOF referente ao array species.
      if (animal === nome.id) {
        objColab.species.push(nome.name);
        objColab.locations.push(nome.location); // localização do animal
      }
    });
  });
  return objColab;
}

function transformString(id) { // caso o valor de id seja um objeto{}, será convertido em string, caso contrario(else) será retornaddo a propria string id
  if ((id !== 'string') && (id !== undefined)) {
    const [idValue] = (Object.values(id)); // destruturação do array Object.values
    return idValue;
  }
  return id;
}

function verifyEmployees(id) {
  const idValue = transformString(id); // chama a função transformString
  // caso não encontre nehum correspondecia vai retornar false, com a negacao na frente vai virar true e lançar o erro
  if ((!data.employees.some((colaborador) => // quebra de linha na HOF some
    ((colaborador.id === idValue) || (colaborador.firstName === idValue) // quebra de linha
    || (colaborador.lastName === idValue)))) // quebra de linha
    && (id !== undefined)) {
    throw new Error('Informações inválidas');
  }
}

function searchEmployees(id) {
  const idValue = transformString(id); // chama a função transformStringconst [idValue] = (Object.values(id)); // destruturação do array Object.values
  const arrayCol = data.employees.find((colaborador) => // quebra de linha na HOF find
    ((colaborador.id === idValue) || (colaborador.firstName === idValue) // quebra de linha
    || (colaborador.lastName === idValue))); // retorna o objeto com comparação no id
  let objColab = { id: arrayCol.id, fullName: `${arrayCol.firstName} ${arrayCol.lastName}` };
  objColab.species = []; // criando a key species com value array vazio
  objColab.locations = []; // criando a key locations com value array vazio
  objColab = nameId(arrayCol, objColab); // o objColab está sendo passado como parâmetro e está retornando da função nameId com o acrescimo de species e locations.
  return objColab;
}

function getEmployeesCoverage(id) {
  verifyEmployees(id);
  try {
    if (id !== undefined) {
      return searchEmployees(id);
    }
    // caso não seja passado nehum parâmentro vai fazer a busca em todo o objeto employees levando em consideração o id de cada um
    const arrayColab = []; //  vai armazenar informaçãos de todos os colaboradores
    data.employees.forEach((colaborador) => {
      arrayColab.push(searchEmployees({ id: colaborador.id })); // o parametro da funcao será o id do employees no formato de objeto{}
    });
    return arrayColab;
  } catch (error) {
    return error.message;
  }
}
// console.log(getEmployeesCoverage({ name: 'Sharonda' }));
module.exports = getEmployeesCoverage;
