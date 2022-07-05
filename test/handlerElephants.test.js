const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Testa a váriavel count, deve retornar a quantidade de elefantes', () => {
    expect(handlerElephants('count')).toEqual(4);
  });
  it('Testa o retorno dos nomes, deve retornar o nome "Jefferson" ', () => {
    expect(handlerElephants('names').find((nome) => nome === 'Jefferson')).toBe('Jefferson');
  });
  it('Testa a media das soma das idades', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });
  it('Testa o default parâmetro do Switch', () => {
    expect(handlerElephants('null')).toBe(null);
  });
  it('Testa o parâmetro undefined', () => {
    expect(handlerElephants()).toBe(undefined);
  });
  it('Testa parâmentro diferente de typeof string', () => {
    expect(handlerElephants(5)).toBe('Parâmetro inválido, é necessário uma string');
  });
  it('Testa o retorno de key do objeto', () => {
    expect(handlerElephants('popularity')).toBe(5);
  });
});
