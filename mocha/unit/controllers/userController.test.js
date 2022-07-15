// const sinon = require('sinon');
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');

// const { makeRes } = require('../../utils/mocks');
// const { TOKEN } = require('../../utils/constants');
// const usersService = require('../../../src/services/usersService');
// const userController = require('../../../src/controllers/userController');
// const authService = require('../../../src/services/authService');

// chai.use(chaiAsPromised);

// describe('controllers/userController', () => {
//   beforeEach(sinon.restore);
  
//   describe('add', () => {
//     it('Deve disparar um erro se usersService.validateBodyAdd disparar um erro', () => {
//       sinon.stub(usersService, 'validateBodyAdd').rejects();
//       return chai.expect(userController.add({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se usersService.findOrCreate disparar um erro', () => {
//       sinon.stub(usersService, 'validateBodyAdd').resolves();
//       sinon.stub(usersService, 'findOrCreate').rejects();
//       return chai.expect(userController.add({}, {})).to.eventually.be.rejected;
//     });

//     it('Deve disparar um erro se authService.makeToken disparar um erro', () => {
//       sinon.stub(usersService, 'validateBodyAdd').resolves();
//       sinon.stub(usersService, 'findOrCreate').resolves();
//       sinon.stub(authService, 'makeToken').rejects();
//       return chai.expect(userController.add({}, {})).to.eventually.be.rejected;
//     });
    
//     it('Deve chamar o status "201" e retornar o token', async () => {
//       sinon.stub(usersService, 'validateBodyAdd').resolves();
//       sinon.stub(usersService, 'findOrCreate').resolves();
//       sinon.stub(authService, 'makeToken').resolves(TOKEN);
//       const res = makeRes();
//       await userController.add({body: {email: ''}}, res);
//       chai.expect(res.status.getCall(0).args[0]).to.deep.equal(201);
//       return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({token: TOKEN});
//     });
//   });
// });