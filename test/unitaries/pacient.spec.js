import { expect } from 'chai';
import { Pacient } from '../../src/pacient.js';
import sinon from 'sinon';

describe('Pacient — proves unitàries', function () {
  let pacient;

  beforeEach(function () {
    pacient = new Pacient('Laia', 'Ferrer Soler', '16/03/1988');
  });

  describe('Validació al constructor', function () {
    it('llança error si el nom està buit', function () {
      expect(() => new Pacient('', 'Ferrer', '01/01/2000')).to.throw(/nom/);
    });

    it('llança error si el nom només té espais', function () {
      expect(() => new Pacient('   ', 'Ferrer', '01/01/2000')).to.throw(/nom/);
    });

    it('llança error si la data de naixement és futura', function () {
      expect(() => new Pacient('Anna', 'Puig', '01/01/2999')).to.throw(/futur/);
    });
  });

  it('saludar() retorna «Hola, soc Laia Ferrer Soler»', function () {
    expect(pacient.saludar()).to.equal('Hola, soc Laia Ferrer Soler');
  });

  it('obtenirNom() i modificarNom()', function () {
    expect(pacient.obtenirNom()).to.equal('Laia');
    pacient.modificarNom('Marta');
    expect(pacient.obtenirNom()).to.equal('Marta');
  });

  it('obtenirCognoms() i modificarCognoms()', function () {
    pacient.modificarCognoms('Ribes Mas');
    expect(pacient.obtenirCognoms()).to.equal('Ribes Mas');
  });

  describe('obtenirEdat() amb el rellotge fixat (Sinon)', function () {
    let clock;
    beforeEach(function () {
      clock = sinon.useFakeTimers(new Date(2030, 0, 1)); // 1/1/2030
    });
    afterEach(function () {
      clock.restore();
    });

    it('sense data de referència: Laia (16/03/1988) té 41 anys', function () {
      const p = new Pacient('Laia', 'Ferrer', '16/03/1988');
      expect(p.obtenirEdat()).to.equal(41);
    });
  });

  it('accepta la data com a text dd/mm/aaaa', function () {
    const d = pacient.obtenirDataNaixement();
    expect(d).to.be.instanceOf(Date);
    expect([d.getDate(), d.getMonth() + 1, d.getFullYear()])
      .to.deep.equal([16, 3, 1988]);
  });

  describe('obtenirEdat() amb data de referència fixa', function () {
    it('el dia abans de l\'aniversari encara té 37 anys', function () {
      expect(pacient.obtenirEdat(new Date(2026, 2, 15))).to.equal(37);
    });

    it('el dia de l\'aniversari ja en té 38', function () {
      expect(pacient.obtenirEdat(new Date(2026, 2, 16))).to.equal(38);
    });

    it('després de modificar la data de naixement', function () {
      pacient.modificarDataNaixement('29/02/2000');
      expect(pacient.obtenirEdat(new Date(2026, 9, 5))).to.equal(26);
    });
  });

  it('té una bàscula associada per defecte', function () {
    expect(pacient.obtenirBascula()).to.exist;
    expect(pacient.calcularIMC()).to.equal(0);
  });

  it('accepta la data com a objecte Date al constructor', function () {
    const d = new Date(1990, 4, 20);
    const p = new Pacient('Anna', 'Puig', d);
    expect(p.obtenirDataNaixement()).to.equal(d);
  });

  it('modificarDataNaixement() accepta un Date', function () {
    const d = new Date(2001, 11, 24);
    pacient.modificarDataNaixement(d);
    expect(pacient.obtenirDataNaixement()).to.equal(d);
  });
});
