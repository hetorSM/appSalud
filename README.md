# appSalud
Programa para calcular la salud segun el indice de masa corporal **(IMC)**

## CASO PRACTICO: MOCHA CHAI en Node.js

Instalar IDE

https://code.visualstudio.com/download

Instalar versión de Node.JS

https://github.com/nvm-sh/nvm

Descargar la APP Salud del Github mediante CODE

https://github.com/gonzalodemaio/AppSalud.git

## Activitats

**Activitat 1.** Posada en marxa. Crea el projecte des de zero seguint els apartats 3 i 4, executa npm test i comprova que obtens 34 proves correctes. Fes una captura de l'eixida.

**Activitat 2.** Cobertura del 100%. Afig les proves necessàries perquè c8 indique un 100% de cobertura de branques a pacient.js.

**Activitat 3.** Regressió. Introdueix tu mateix tres errors diferents al codi de src/ (un per mètode) i comprova que alguna prova els detecta. Si algun error no es detecta, escriu la prova que falta.

**Activitat 4.** TDD. Seguint la metodologia Test Driven Development, escriu primer les proves i després el codi d'un mètode nou Bascula.obtenirEvolucio(), que retorna la diferència de pes entre l'última i la primera pesada (positiva si ha augmentat, negativa si ha disminuït, 0 si hi ha menys de dues pesades).

**Activitat 5.** Dates i Sinon. Prova obtenirEdat() sense passar la data de referència, usant sinon.useFakeTimers(new Date(2030, 0, 1)) per a fixar el rellotge del sistema. Recorda restaurar-lo.

**Activitat 6.** Validació al Pacient. Modifica el constructor de Pacient perquè llance un error si el nom està buit o la data de naixement és posterior a hui. Escriu primer les proves.

**Activitat 7.** Integració contínua. Puja el projecte a GitHub i crea un workflow de GitHub Actions que execute npm ci i npm test a cada push. Comprova que, si una prova falla, el workflow es marca en roig.

Pista per a l'activitat 7 **.github/workflows/proves.yml**
```bash
mkdir -p .github/workflows
touch .github/workflows/proves.yml
```
Crear el archivo **.github/workflows/proves.yml:**
```yaml
name: Proves
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm test
```