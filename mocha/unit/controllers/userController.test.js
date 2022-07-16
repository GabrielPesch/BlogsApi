// const sinon = require('sinon');
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');

// const { makeRes } = require('../../utils/mocks');
// const { TOKEN } = require('../../utils/constants');
// const usersService = require('../../../src/services/usersService');
// const usersController = require('../../../src/controllers/usersController');
// const authService = require('../../../src/services/authService');

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
//     it('Deve disparar um erro se authService.validateAuthorization disparar um erro', () => {
//       sinon.stub(authService, 'validateAuthorization').rejects();
//       return chai.expect(usersController.getAll({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se authService.readToken disparar um erro', () => {
//       sinon.stub(authService, 'validateAuthorization').resolves();
//       sinon.stub(authService, 'readToken').rejects();
//       return chai.expect(usersController.getAll({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se usersService.getAll disparar um erro', () => {
//       sinon.stub(authService, 'validateAuthorization').resolves();
//       sinon.stub(authService, 'readToken').resolves();
//       sinon.stub(usersService, 'getAll').rejects();
//       return chai.expect(usersController.getAll({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve retornar o token', async () => {
//       sinon.stub(authService, 'validateAuthorization').resolves();
//       sinon.stub(authService, 'readToken').resolves();
//       sinon.stub(usersService, 'getAll').resolves([]);
//       const res = makeRes();
//       await usersController.getAll({headers: {authorization: ''}}, res);
//       return chai.expect(res.json.getCall(0).args[0]).to.deep.equal([]);
//     });
//   });
// });