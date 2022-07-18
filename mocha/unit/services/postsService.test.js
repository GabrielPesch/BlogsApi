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
  
  describe('findById', () => {
    it('Deve disparar um erro caso BlogPost.findByPk também dispare', () => {
      sinon.stub(BlogPost, 'findByPk').rejects();
      return chai.expect(postsService.findById()).to.eventually.be.rejected;
    });

    it('Deve disparar um "throwPostNotFoundError" caso o model resolva sem encontrar um Post', () => {
      sinon.stub(BlogPost, 'findByPk').resolves(null);
      return chai.expect(postsService.findById({})).to.eventually.be.rejectedWith("Post does not exist");
    });

    it('Deve retornar um objeto user caso BlogPost.findByPk retorne um usuário', () => {
      sinon.stub(BlogPost, 'findByPk').resolves({});
      return chai.expect(postsService.findById({})).to.eventually.be.deep.equal({});
    });
  });
});