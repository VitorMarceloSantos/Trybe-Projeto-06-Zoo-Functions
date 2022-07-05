const data = require('../data/zoo_data');

// const entrants = [
//   { name: 'Lara Carvalho', age: 5 },
//   { name: 'Frederico Moreira', age: 5 },
//   { name: 'Pedro Henrique Carvalho', age: 5 },
//   { name: 'Maria Costa', age: 18 },
//   { name: 'Núbia Souza', age: 18 },
//   { name: 'Carlos Nogueira', age: 50 },
// ];

function countEntrants(entrantsParam) {
  const objEntrants = { child: 0, adult: 0, senior: 0 };
  entrantsParam.forEach((cliente) => {
    if (cliente.age < 18) {
      objEntrants.child += 1;
    } else if ((cliente.age >= 18) && (cliente.age < 50)) {
      objEntrants.adult += 1;
    } else {
      objEntrants.senior += 1;
    }
  });
  return objEntrants;
}

function calculateEntry(entrantsParam) {
  if ((entrantsParam === undefined) || (Object.keys(entrantsParam).length === 0)) return 0; // em uma linha não há a necessidade de se utilizar parêntes
  const objEntrants = countEntrants(entrantsParam);
  const arrayKeys = Object.keys(objEntrants);
  return arrayKeys.reduce((acc, curr) => acc + (objEntrants[curr] * data.prices[curr]), 0);
}

// console.log(countEntrants(entrants));
// console.log(calculateEntry(entrants));
module.exports = { calculateEntry, countEntrants };
