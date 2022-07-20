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

  describe('getAll', () => {
    it('Deve disparar um erro caso Category.findAll também dispare', () => {
      sinon.stub(Category, 'findAll').rejects();
      return chai.expect(categoriesService.getAll()).to.eventually.be.rejected;
    });

    it('Deve retornar um array caso Category.findAll tenha sucesso', () => {
      sinon.stub(Category, 'findAll').resolves([{}]);
      return chai.expect(categoriesService.getAll()).to.eventually.be.deep.equal([{}]);
    });
  });

  describe('checkExistsById', () => {
    it('Deve disparar um erro caso Category.findAndCountALL também dispare', () => {
      sinon.stub(Category, 'findAndCountAll').rejects();
      return chai.expect(categoriesService.checkExistsById()).to.eventually.be.rejected;
    });

    it('Deve disparar um erro CategoryNotFound caso Category.findAndCountAll não encontre todos os IDs', () => {
      sinon.stub(Category, 'findAndCountAll').resolves({count: 1});
      return chai.expect(categoriesService.checkExistsById([1, 2])).to.eventually.be.rejectedWith('"categoryIds" not found');
    });

    it('Deve retornar undefined caso sejam  encontrados todos os ids', () => {
      sinon.stub(Category, 'findAndCountAll').resolves({count: 3});
      return chai.expect(categoriesService.checkExistsById([1, 2, 3])).to.eventually.be.undefined;
    })
  });
});