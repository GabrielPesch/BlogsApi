const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { makeRes } = require('../../utils/mocks');
const postsService = require('../../../src/services/postsService');
const authorizationMiddleware = require('../../../src/middlewares/authorizationMiddleware');
const postsController = require('../../../src/controllers/postsController');
const { readToken } = require('../../../src/services/authService');
const authService = require('../../../src/services/authService');
const categoriesService = require('../../../src/services/categoriesService');

chai.use(chaiAsPromised);

describe('controllers/postController', () => {
  beforeEach(sinon.restore);

  describe('add', () => {
    it('Deve disparar um erro se postsService.validateBodyAdd disparar um erro', () => {
      sinon.stub(postsService, 'validateBodyAdd').rejects();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      return chai.expect(postsController.add({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
      sinon.stub(postsService, 'validateBodyAdd').resolves();
      sinon.stub(authorizationMiddleware, 'validate').rejects();
      return chai.expect(postsController.add({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se authService.readToken disparar um erro', () => {
      sinon.stub(postsService, 'validateBodyAdd').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').rejects()
      return chai.expect(postsController.add({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se categoriesService.checkExistsById disparar um erro', () => {
      sinon.stub(postsService, 'validateBodyAdd').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves();
      sinon.stub(categoriesService, 'checkExistsById').rejects();
      return chai.expect(postsController.add({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se postsService.create disparar um erro', () => {
      sinon.stub(postsService, 'validateBodyAdd').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves();
      sinon.stub(categoriesService, 'checkExistsById').resolves();
      sinon.stub(postsService, 'create').rejects();
      return chai.expect(postsController.add({}, {})).to.eventually.be.rejected;
    });

    it('Deve chamar o status "201" e retornar o post', async () => {
      sinon.stub(postsService, 'validateBodyAdd').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves({id: 1});
      sinon.stub(categoriesService, 'checkExistsById').resolves();
      sinon.stub(postsService, 'create').resolves({});
      const res = makeRes();
      await postsController.add({ headers: {authorization: ''}, body:{ categoryIds: [1] }}, res);
      chai.expect(res.status.getCall(0).args[0]).to.deep.equal(201);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('getAll', () => {
    it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
      sinon.stub(authorizationMiddleware, 'validate').rejects();
      return chai.expect(postsController.getAll({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se postsService.getAll disparar um erro', () => {
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(postsService, 'getAll').rejects();
      return chai.expect(postsController.getAll({}, {})).to.eventually.be.rejected;
    });

    it('Deve retornar a lista de Posts', async () => {
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(postsService, 'getAll').resolves([]);
      const res = makeRes();
      await postsController.getAll({headers: {authorization: ''}}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
    });
  });

  describe('getById', () => {
    it('Deve disparar um erro se postsService.validateParamsId disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').rejects();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      return chai.expect(postsController.getById({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(authorizationMiddleware, 'validate').rejects();
      return chai.expect(postsController.getById({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se usersService.findById disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(authorizationMiddleware, 'validate').rejects();
      sinon.stub(postsService, 'findById').rejects();
      return chai.expect(postsController.getById({}, {})).to.eventually.be.rejected;
    });

    it('Deve retornar o post', async () => {
      sinon.stub(postsService, 'validateParamsId').resolves(1);
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(postsService, 'findById').resolves({});
      const res = makeRes();
      await postsController.getById({headers: {authorization: ''}}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('edit', () => {
    it('Deve disparar um erro se postsService.validateParamsId disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').rejects();
      sinon.stub(postsService, 'validateBodyEdit').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      return chai.expect(postsController.edit({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se postsService.validateBodyEdit disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(postsService, 'validateBodyEdit').rejects();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      return chai.expect(postsController.edit({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se usersService.findById disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(postsService, 'validateBodyEdit').resolves();
      sinon.stub(authorizationMiddleware, 'validate').rejects();
      return chai.expect(postsController.edit({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se authService.readToken disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(postsService, 'validateBodyEdit').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').rejects();
      return chai.expect(postsController.edit({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se postsService.checkIfIsAuthorized disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(postsService, 'validateBodyEdit').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves();
      sinon.stub(postsService, 'checkIfIsAuthorized').rejects();
      return chai.expect(postsController.edit({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se postsService.edit disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(postsService, 'validateBodyEdit').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves();
      sinon.stub(postsService, 'checkIfIsAuthorized').resolves();
      sinon.stub(postsService, 'edit').rejects();
      return chai.expect(postsController.edit({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se postsService.findById disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(postsService, 'validateBodyEdit').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves();
      sinon.stub(postsService, 'checkIfIsAuthorized').resolves();
      sinon.stub(postsService, 'edit').resolves();
      sinon.stub(postsService, 'findById').rejects();
      return chai.expect(postsController.edit({}, {})).to.eventually.be.rejected;
    });

    it('Deve retornar o post', async () => {
      sinon.stub(postsService, 'validateParamsId').resolves({id: 1});
      sinon.stub(postsService, 'validateBodyEdit').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves({id: 2});
      sinon.stub(postsService, 'checkIfIsAuthorized').resolves();
      sinon.stub(postsService, 'edit').resolves();
      sinon.stub(postsService, 'findById').resolves({});
      const res = makeRes();
      await postsController.edit({headers: {authorization: ''}}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe.only('remove', () => {
    it('Deve disparar um erro se postsService.validateParamsId disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').rejects();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      return chai.expect(postsController.remove({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(authorizationMiddleware, 'validate').rejects();
      return chai.expect(postsController.remove({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se authService.readToken disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').rejects();
      return chai.expect(postsController.remove({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se postsService.checkIfIsAuthorized disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves();
      sinon.stub(postsService, 'checkIfIsAuthorized').rejects()
      return chai.expect(postsController.remove({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se postsService.remove disparar um erro', () => {
      sinon.stub(postsService, 'validateParamsId').resolves();
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves();
      sinon.stub(postsService, 'checkIfIsAuthorized').resolves();
      sinon.stub(postsService, 'remove').rejects();
      return chai.expect(postsController.remove({}, {})).to.eventually.be.rejected;
    });

    it('Deve retornar o post', async () => {
      sinon.stub(postsService, 'validateParamsId').resolves({id: 1});
      sinon.stub(authorizationMiddleware, 'validate').resolves();
      sinon.stub(authService, 'readToken').resolves({id: 2});
      sinon.stub(postsService, 'checkIfIsAuthorized').resolves();
      sinon.stub(postsService, 'remove').resolves();
      const res = makeRes();
      await postsController.remove({headers: {authorization: ''}}, res);
      chai.expect(res.sendStatus.getCall(0).args[0]).to.deep.equal(204);
    });
  });
});