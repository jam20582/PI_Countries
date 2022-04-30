const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});


// describe("name", () => {
//   it("Arroja un error si name es numero", (done) => {
//     Country.create({ name: '1423'})
//       .then(() => done(new Error("name no puede ser un numero")))
//       .catch(() => done());
//   });  

//   it("Arroja un error si name tiene longitud menor a 3 caracteres", (done) => {
//     Country.create({ name: "Ab"})
//       .then(() => done(new Error("Name debe tener una longitud minima de 3 caracteres")))
//       .catch(() => done());
//   });
// });