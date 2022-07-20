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

  describe('findByQuery', () => {
    it('Deve disparar um erro caso BlogPost.findByPk também dispare', () => {
      sinon.stub(BlogPost, 'findAll').rejects();
      return chai.expect(postsService.findByQuery()).to.eventually.be.rejected;
    });

    it('Deve retornar um array caso BlogPost.findAll tenha sucesso', () => {
      sinon.stub(BlogPost, 'findAll').resolves([{}]);
      return chai.expect(postsService.findByQuery()).to.eventually.be.deep.equal([{}]);
    });
  });

  describe('checkIfIsAuthorized', () => {
    it('Deve disparar um erro caso BlogPost.findByPk também dispare', () => {
      sinon.stub(BlogPost, 'findByPk').rejects();
      return chai.expect(postsService.checkIfIsAuthorized(1, 1)).to.eventually.be.rejected;
    });

    it('Deve disparar um "throwPostNotFoundError" caso o model resolva sem encontrar um Post', () => {
      sinon.stub(BlogPost, 'findByPk').resolves(null);
      return chai.expect(postsService.checkIfIsAuthorized(null)).to.eventually.be.rejectedWith("Post does not exist");
    });

    it('Deve disparar um "UnauthorizedError" caso blogPost.findByPk retorne um id diferente de userId', () => {
      sinon.stub(BlogPost, 'findByPk').resolves({userId: 2});
      return chai.expect(postsService.checkIfIsAuthorized(1, 1)).to.eventually.be.rejectedWith('Unauthorized user');
    });

    it('Deve retornar um objeto user caso BlogPost.findByPk retorne um post', () => {
      sinon.stub(BlogPost, 'findByPk').resolves({userId: 2});
      return chai.expect(postsService.checkIfIsAuthorized(1, 2)).to.eventually.be.undefined;
    });
  });

  describe('edit', () => {
    it('Deve disparar um erro caso BlogPost.update também dispare', () => {
      sinon.stub(BlogPost, 'update').rejects();
      return chai.expect(postsService.edit({}, 1)).to.eventually.be.rejected;
    });
    it('Deve retornar UNDEFINED caso o BLogPost.update seja bem sucedido', () => {
      sinon.stub(BlogPost, 'update').resolves();
      return chai.expect(postsService.edit({}, 1)).to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('Deve disparar um erro caso BlogPost.destroy também dispare', () => {
      sinon.stub(BlogPost, 'destroy').rejects();
      return chai.expect(postsService.remove(1)).to.eventually.be.rejected;
    });
    it('Deve retornar UNDEFINED caso o BLogPost.destroy seja bem sucedido', () => {
      sinon.stub(BlogPost, 'destroy').resolves();
      return chai.expect(postsService.remove(1)).to.eventually.be.undefined;
    });
  });
});