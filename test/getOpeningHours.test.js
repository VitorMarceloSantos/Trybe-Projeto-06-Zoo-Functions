const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('Testando a função sem parâmetro, retorno objetos.', () => {
    const expected = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    expect(getOpeningHours()).toEqual(expected);
  });
  it('Para os argumentos Monday e 09:00-AM deve retornar a string "The zoo is closed"', () => {
    expect(getOpeningHours('Monday', '09:00-AM')).toBe('The zoo is closed');
  });
  it('Para os argumentos Tuesday e 09:00-AM deve retornar a string "The zoo is open"', () => {
    expect(getOpeningHours('Tuesday', '09:00-AM')).toBe('The zoo is open');
  });
  it('Para os argumentos Wednesday e 09:00-AM deve retornar a string "The zoo is closed"', () => {
    expect(getOpeningHours('Wednesday', '09:00-PM')).toBe('The zoo is closed');
  });
  it('Verifica se a string como parâmentro é um número, caso não seja deverá ser lançado um erro', () => { // ^-no ínicio da frase, $-no fim da frase, /d-Aceita todas as expressos que CONTEM numero(Deve ter número para ser valida) -> Expressões regulares
    expect(() => getOpeningHours('Monday', '45')).toThrow(/^The minutes should represent a number$/);
  });
  it('Verifica se a string como parâmentro contém a abreviação AM or PM, caso não seja deverá ser lançado um erro', () => {
    expect(() => getOpeningHours('Monday', '12:35')).toThrow('The abbreviation must be \'AM\' or \'PM\'');
  });
  it('Verifica se a string como parâmentro hora está compreendida entre 0 e 12, caso não seja deverá ser lançado um erro', () => {
    expect(() => getOpeningHours('Monday', '15:00-PM')).toThrow('The hour must be between 0 and 12');
  });
  it('Verifica se a string como parâmentro minutos está compreendida entre 0 e 59, caso não seja deverá ser lançado um erro', () => {
    expect(() => getOpeningHours('Monday', '02:70-PM')).toThrow('The minutes must be between 0 and 59');
  });
  it('Verifica se a string recebida no primeiro parâmetro corresponde a um dia da semana válido, caso não seja deverá ser lançado um erro', () => {
    expect(() => getOpeningHours('Trybe', '05:30-PM')).toThrow('The day must be valid. Example: Monday');
  });
});
