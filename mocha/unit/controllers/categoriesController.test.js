// const sinon = require('sinon');
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');

// const { makeRes } = require('../../utils/mocks');
// const authorizationMiddleware = require('../../../src/middlewares/authorizationMiddleware');
// const categoriesService = require('../../../src/services/categoriesService');
// const categoriesController = require('../../../src/controllers/categoriesController');

// chai.use(chaiAsPromised);

// describe('controllers/categoriesController', () => {
//   beforeEach(sinon.restore);

//   describe('add', () => {
//     it('Deve disparar um erro se categoriesService.validateBodyAdd disparar um erro', () => {
//       sinon.stub(categoriesService, 'validateBodyAdd').rejects();
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       return chai.expect(categoriesController.add({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
//       sinon.stub(categoriesService, 'validateBodyAdd').resolves();
//       sinon.stub(authorizationMiddleware, 'validate').rejects();
//       return chai.expect(categoriesController.add({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se categoriesService.findOrCreate disparar um erro', () => {
//       sinon.stub(categoriesService, 'validateBodyAdd').resolves();
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(categoriesService, 'findOrCreate').rejects
//       return chai.expect(categoriesController.add({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve chamar o status "201" e retornar o token', async () => {
//       sinon.stub(categoriesService, 'validateBodyAdd').resolves();
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(categoriesService, 'findOrCreate').resolves({});
//       const res = makeRes();
//       await categoriesController.add({body: {name: ''}, headers: {authorization: ''}}, res);
//       chai.expect(res.status.getCall(0).args[0]).to.deep.equal(201);
//       return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
//     });
//   });

//   describe('getAll', () => {
//     it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
//       sinon.stub(authorizationMiddleware, 'validate').rejects();
//       return chai.expect(categoriesController.getAll({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se categoriesService.getAll disparar um erro', () => {
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(categoriesService, 'getAll').rejects();
//       return chai.expect(categoriesController.getAll({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve retornar a lista de categorias', async () => {
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(categoriesService, 'getAll').resolves([]);
//       const res = makeRes();
//       await categoriesController.getAll({headers: {authorization: ''}}, res);
//       return chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
//     });
//   });
// });