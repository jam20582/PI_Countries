const { Country, conn } = require('../../src/db');
const { expect } = require('chai');

const countryData = {
  id: 'testID',
  name: 'Argentina',
  flag: 'https://argentine-flag-image.com',
  region: 'Americas',
  capital: 'Buenos Aires',
  subregion: 'South America',
  area:'2780400',
  population: '45376763'
};

describe('Country model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));

    describe('primaryKey', () => {
      it('should generate a valid id as primary key', async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property('id', country.id);
      });
    });

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({}).catch((err) => {
          expect(err.message).to.be.match(/country.name cannot be null/);
          done();
        });
      });

      it('should work when its a valid name', async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property('name', country.name);
      });
    });

    describe('flag', () => {
      it('should throw an error if flag is null', (done) => {
        Country.create({}).catch((err) => {
          expect(err.message).to.be.match(/country.flag cannot be null/);
          done();
        });
      });

      it('should work when its a valid flag', async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property('flag', countryData.flag);
      });
    });

    describe('region', () => {
      it('should throw an error if region is null', (done) => {
        Country.create({}).catch((err) => {
          expect(err.message).to.be.match(/country.region cannot be null/);
          done();
        });
      });

      it('should work when its a valid region', async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property('region', countryData.region);
      });
    });

    describe('capital', () => {
      it('should throw an error if capital is null', (done) => {
        Country.create({}).catch((err) => {
          expect(err.message).to.be.match(/country.capital cannot be null/);
          done();
        });
      });

      it('should work when its a valid capital', async () => {
        const country = await Country.create(countryData);
        expect(country.toJSON()).to.have.property('capital', countryData.capital);
      });
    });
    
  });
});