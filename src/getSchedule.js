const data = require('../data/zoo_data');

function objAnimais(scheduleTarget, days) {
  const objFunc = {}; // criando um objeto vazio
  for (let i = 0; i < days.length; i += 1) {
    const arrAnimais = []; // criando um arrayTemporario para armazenar os animais com os correspondente dia
    objFunc[days[i]] = {};
    objFunc[days[i]]
      .officeHour = `Open from ${data.hours[days[i]].open}am until ${data.hours[days[i]].close}pm`;// quebra de linha, pode quebrar no ponto final, quebra de linha no template `linha 15`
    data.species.forEach((animal) => { // adcicionando no arrAnimais os animais que corresponde ao dia da semana(arrDays[i])
      if ((animal.availability.some((day) => day === days[i]))
      && !(arrAnimais.some((anArray) => anArray === animal.name))) arrAnimais.push(animal.name); // quebra de linha - 18 no If
    });
    objFunc[days[i]].exhibition = arrAnimais; // adicionando o arrAnimais no objFunc no dia correto
  }
  objFunc.Monday = { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };
  return objFunc;
}

function getSchedule(scheduleTarget) {
  const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  if (data.species.some((animal) => animal.name === scheduleTarget)) { // caso o nome do animail corresponde com o parâmetro vai retornar true
    return data.species.find((animal) => animal.name === scheduleTarget).availability;
  }
  const objFunc = objAnimais(scheduleTarget, days); // chamando a função
  const objDays = {}; // utilizado para retornar em caso do parametro ser igual ao dia
  if (scheduleTarget === 'Monday') {
    objDays[scheduleTarget] = objFunc.Monday;
    return objDays; // caso o parâmetro seja 'Sunday'
  }
  if (days.some((dia) => dia === scheduleTarget)) {
    objDays[scheduleTarget] = objFunc[scheduleTarget]; // confere se foi passado o dia da semana
    return objDays;
  }
  return objFunc; // caso nao seja passado como parâmentro o nome do animal ou o dia da semana
}
// console.log(getSchedule('Monday'));
module.exports = getSchedule;
