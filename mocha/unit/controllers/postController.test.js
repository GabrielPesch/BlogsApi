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
});