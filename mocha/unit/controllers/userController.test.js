// const sinon = require('sinon');
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');

// const { makeRes } = require('../../utils/mocks');
// const { TOKEN } = require('../../utils/constants');
// const usersService = require('../../../src/services/usersService');
// const usersController = require('../../../src/controllers/usersController');
// const authService = require('../../../src/services/authService');
// const authorizationMiddleware = require('../../../src/middlewares/authorizationMiddleware');

// chai.use(chaiAsPromised);

// describe('controllers/userController', () => {
//   beforeEach(sinon.restore);
  
//   describe('add', () => {
//     it('Deve disparar um erro se usersService.validateBodyAdd disparar um erro', () => {
//       sinon.stub(usersService, 'validateBodyAdd').rejects();
//       return chai.expect(usersController.add({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se usersService.findOrCreate disparar um erro', () => {
//       sinon.stub(usersService, 'validateBodyAdd').resolves();
//       sinon.stub(usersService, 'findOrCreate').rejects();
//       return chai.expect(usersController.add({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se authService.makeToken disparar um erro', () => {
//       sinon.stub(usersService, 'validateBodyAdd').resolves();
//       sinon.stub(usersService, 'findOrCreate').resolves();
//       sinon.stub(authService, 'makeToken').rejects();
//       return chai.expect(usersController.add({}, {})).to.eventually.be.rejected;
//     });
    
//     it('Deve chamar o status "201" e retornar o token', async () => {
//       sinon.stub(usersService, 'validateBodyAdd').resolves();
//       sinon.stub(usersService, 'findOrCreate').resolves();
//       sinon.stub(authService, 'makeToken').resolves(TOKEN);
//       const res = makeRes();
//       await usersController.add({body: {email: ''}}, res);
//       chai.expect(res.status.getCall(0).args[0]).to.deep.equal(201);
//       return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({token: TOKEN});
//     });
//   });

//   describe('getAll', () => {
//     it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
//       sinon.stub(authorizationMiddleware, 'validate').rejects();
//       return chai.expect(usersController.getAll({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se usersService.getAll disparar um erro', () => {
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(usersService, 'getAll').rejects();
//       return chai.expect(usersController.getAll({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve retornar a lista de Usuários', async () => {
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(usersService, 'getAll').resolves([]);
//       const res = makeRes();
//       await usersController.getAll({headers: {authorization: ''}}, res);
//       return chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
//     });
//   });

//   describe('get', () => {
//     it('Deve disparar um erro se usersService.validateParamsId disparar um erro', () => {
//       sinon.stub(usersService, 'validateParamsId').rejects();
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       return chai.expect(usersController.get({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
//       sinon.stub(usersService, 'validateParamsId').resolves();
//       sinon.stub(authorizationMiddleware, 'validate').rejects();
//       return chai.expect(usersController.get({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se usersService.findById disparar um erro', () => {
//       sinon.stub(usersService, 'validateParamsId').resolves();
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(usersService, 'findById').rejects();
//       return chai.expect(usersController.get({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve retornar o user', async () => {
//       sinon.stub(usersService, 'validateParamsId').resolves(1);
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(usersService, 'findById').resolves({});
//       const res = makeRes();
//       await usersController.get({headers: {authorization: ''}}, res);
//       return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
//     });
//   });

//   describe('remove', () => {
//     it('Deve disparar um erro se authorizationMiddleware.validate disparar um erro', () => {
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       return chai.expect(usersController.remove({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se authService.readToken disparar um erro', () => {
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(authService, 'readToken').resolves();
//       return chai.expect(usersController.remove({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se usersService.remove disparar um erro', () => {
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(authService, 'readToken').resolves();
//       sinon.stub(usersService, 'remove').rejects();
//       return chai.expect(usersController.remove({}, {})).to.eventually.be.rejected;
//     });
  
//     it('Deve retornar o status 204', async () => {
//       sinon.stub(authorizationMiddleware, 'validate').resolves();
//       sinon.stub(authService, 'readToken').resolves({id: 1});
//       sinon.stub(usersService, 'remove').resolves();
//       const res = makeRes();
//       await usersController.remove({headers: {authorization: ''}}, res);
//       chai.expect(res.sendStatus.getCall(0).args[0]).to.deep.equal(204);
//     });
//   });
// });