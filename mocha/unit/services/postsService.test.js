const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { BlogPost } = require('../../../src/database/models');
const postsService = require('../../../src/services/postsService');

chai.use(chaiAsPromised);

describe('services/userService', () => {
  beforeEach(sinon.restore);
  
  describe('getAll', () => {
    it('Deve disparar um erro caso BlogPost.findAll também dispare', () => {
      sinon.stub(BlogPost, 'findAll').rejects();
      return chai.expect(postsService.getAll()).to.eventually.be.rejected;
    });

    it('Deve retornar um array caso BlogPost.findAll tenha sucesso', () => {
      sinon.stub(BlogPost, 'findAll').resolves([{}]);
      return chai.expect(postsService.getAll()).to.eventually.be.deep.equal([{}]);
    });
  });

});