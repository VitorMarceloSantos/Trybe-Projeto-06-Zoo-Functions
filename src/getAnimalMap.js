const data = require('../data/zoo_data');

let contInputs = []; // variável global para verificar quais funções já foram utilizadas.

function createObject() { // criando as keys do objAnimais de forma dinâmica
  const objAnimais = {};
  data.species.forEach((regiao) => {
    if (Object.keys(objAnimais).length === 0) { // vai executar a primeira vez
      objAnimais[regiao.location] = []; // criando de forma dinãmica uma nova key para o objAnimais, adicionando um array vazio como value
    } else {
      (Object.keys(objAnimais)).forEach((key) => { // o retorno de Object.keys, será um array com todas as chaves de objAnimais
        if (key !== regiao.location) {
          objAnimais[regiao.location] = []; // criando de forma dinãmica uma nova key para o objAnimais
        }
      });
    }
  });
  return objAnimais;
}
// Adiciona apenas os animais em suas respectivas regiões
function addAnimals(objAnimais) { // todos os animais serão separados por região
  if (contInputs === 'includes') {
    return objAnimais; // caso tenha efetuado o includesName, não poderá sobrescrever o objAnimais
  }
  data.species.forEach((animais) => {
    objAnimais[animais.location].push(animais.name); // adicionando(.push) no array de cada localização
  });
  contInputs.push('addAnimals'); // adicionando o case default
  return objAnimais;
}

// Incluindo o nome de todos os animais, independente do sexo
function includeNames(paramObj) {
  const objAnimais = paramObj;
  data.species.forEach((animais) => {
    const objNome = { [animais.name]: [] };
    const arrAnimal = [];
    animais.residents.forEach((nome) => {
      arrAnimal.push(nome.name); // vai gerar um array com todos os nomes do animal
    });
    objNome[animais.name].push(...arrAnimal); // destruturação do array
    // console.log(objNome);
    objAnimais[animais.location].push(objNome); // adicionando(.push) no array de cada localização
  });
  contInputs.push('includes'); // adicionando o incluesNames
  return objAnimais;
}

function verifyIncludes(paramObj) { // verifica se a função includesNames já foi utilizada
  for (let i = 0; i < contInputs.length; i += 1) { // verifica quais funções foram utilizadas
    if (contInputs[i] === 'includes') { // caso em que foi utilizado o includesNames;
      return true;
    }
    if (contInputs[i] === 'addAnimals') { // caso já tenha entrado no case default
      return paramObj;
    }
  }
  const objAnimais = addAnimals(paramObj); // case default
  return objAnimais;
}

// Colocando os nomes dos animais em ordem alfabetica
function sorted(paramObj) {
  const objAnimais = paramObj;
  if (verifyIncludes(objAnimais) === true) {
    data.species.forEach((animais) => {
      objAnimais[animais.location].forEach((elemento, index) => { // quebra de linha
        elemento[Object.keys(objAnimais[animais.location][index])].sort();
      });
    });
    return objAnimais;
  }
  return objAnimais;
}

// Retorna apenas os nomeos do animais do sexo Masculino ou Feminino
function sexMaleOrFemale(sexo) { // criando um novo objeto com o sexo desejado, e subistituindo o existente
  const objAnimais = createObject();
  data.species.forEach((animais) => {
    const objNome = { [animais.name]: [] };
    const arrAnimal = [];
    animais.residents.forEach((nome) => {
      if (nome.sex === sexo[0]) arrAnimal.push(nome.name); // vai gerar um array com todos os nomes do animal // o parâmetro sexo é um array
    });
    objNome[animais.name].push(...arrAnimal); // destruturação do array
    objAnimais[animais.location].push(objNome); // adicionando(.push) no array de cada localização
  });
  return objAnimais;
}

// // Retorna apenas os nomeos do animais do sexo Feminino
// function sexFemale() {
//   const objAnimais = createObject();
//   data.species.forEach((animais) => {
//     const objNome = { [animais.name]: [] };
//     const arrAnimal = [];
//     animais.residents.forEach((nome) => {
//       if (nome.sex === 'female') arrAnimal.push(nome.name); // vai gerar um array com todos os nomes do animal
//     });
//     objNome[animais.name].push(...arrAnimal); // destruturação do array
//     // console.log(objNome);
//     objAnimais[animais.location].push(objNome); // adicionando(.push) no array de cada localização
//   });
//   verificaIncludesNames = false;
//   return objAnimais;
// }

// Verifica o conteudo do objeto, e retorna true or false
function objEquals(paramIf, options) {
  const keyA = (Object.keys(paramIf))[0].split(''); // separando as letras do array para que haja a comparação por letra
  const keyB = (Object.keys(options))[0].split(''); // separando as letras do array para que haja a comparação por letra
  const valueA = (Object.values(paramIf))[0]; // type boolean
  const valueB = Object.values(options)[0]; // type boolean
  let verificador = true; // inicializado com true

  verificador = keyA.every((a, index) => a === keyB[index]); // compara os dois arrays
  if (valueA !== valueB) verificador = false;
  return verificador; // vai retornar true or false, verifica se vai entrar ou não no IF
}

// Verificando as condições de male e female
function verifyFunctionsMaleOrFemale(objTemporario, objTemp) { // objTemp - objeto com as informaçoes dos animais
  let objAnimais = objTemp;
  if ((verifyIncludes(objTemp) === true) // quebra de linha
  && ((objEquals({ sex: 'male' }, objTemporario)) // quebra de linha
  || (objEquals({ sex: 'female' }, objTemporario)))) {
    objAnimais = sexMaleOrFemale(Object.values(objTemporario)); // passando como parâmetro o sexo(Male or Female)
    return objAnimais;
  }
  return objAnimais;
}

// Verificando as condições das funçoes
function verifyFunctions(objTemporario, objTemp) {
  let objAnimais = objTemp; // recebendo o parâmetro
  if (objEquals({ includeNames: true }, objTemporario)) {
    objAnimais = includeNames(objTemp);
    return objAnimais;
  }
  if (objEquals({ sorted: true }, objTemporario)) {
    objAnimais = sorted(objTemp);
    return objAnimais;
  }
  objAnimais = verifyFunctionsMaleOrFemale(objTemporario, objTemp);
  return objAnimais;
}

function getAnimalMap(options) {
  let objAnimais = createObject(); // não necessita de parâmetros
  if (options === undefined) {
    objAnimais = addAnimals(objAnimais);
  } else {
    const tempKeys = Object.keys(options); // array com as keys do paramentro options
    for (let i = 0; i < Object.keys(options).length; i += 1) {
      const objTemporario = { [tempKeys[i]]: options[tempKeys[i]] }; // objTemporarios vai receber cada um dos objetos dentro do parametro options
      objAnimais = verifyFunctions(objTemporario, objAnimais);
    } // for
  } // else
  contInputs = []; // toda nova execução irá zerar o array verificador
  return objAnimais;
}
// Para mostrar determinada parte do código, pode especificar a chave do objeto. Exemplo: console.log(getAnimalMap({ includeNames: true, sex: 'female', sorted: true }).NE)
// console.log(getAnimalMap({ includeNames: true, sex: 'female', sorted: true })); // o parâmetro deve ser um objeto: 1- argumento { sex: male } ,2 argumentos { sex: 'female', sorted: true }, { includeNames: true, sorted: true }
module.exports = getAnimalMap;
