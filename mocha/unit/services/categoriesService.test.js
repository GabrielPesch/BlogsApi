const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { Category } = require('../../../src/database/models');
const categoriesService = require('../../../src/services/categoriesService');

chai.use(chaiAsPromised);

describe('services/categoriesService', () => {
  beforeEach(sinon.restore);

  describe('findOrCreate', () => {
    it('Deve disparar um erro caso Category.findOrCreate também dispare', () => {
      sinon.stub(Category, 'findOrCreate').rejects();
      return chai.expect(Category.findOrCreate('')).to.eventually.be.rejected;
    });

    it('Deve disparar um "Category already registered" caso Category.findOrCreate retorne created como False', () => {
      sinon.stub(Category, 'findOrCreate').resolves([{}, false]);
      return chai.expect(categoriesService.findOrCreate('')).to.eventually.be.rejectedWith('Category already registered');
    });

    it('Deve retornar um usuário sem a senha caso User.findOrCreate retorne created como true', () => {
      sinon.stub(Category, 'findOrCreate').resolves([{}, {}]);;
      return chai.expect(categoriesService.findOrCreate('')).to.eventually.be.deep.equal({});
    });
  });
});