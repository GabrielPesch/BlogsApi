// const sinon = require('sinon');
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');
// const { User } = require('../../../src/database/models');
// const usersService = require('../../../src/services/usersService');

// chai.use(chaiAsPromised);

// describe('services/userService', () => {
//   beforeEach(sinon.restore);
  
//   describe('VerifyEmailAndPassword', () => {
//     it('Deve disparar um erro caso User.findOne também dispare', () => {
//       sinon.stub(User, 'findOne').rejects();
//       return chai.expect(usersService.VerifyEmailAndPassword({})).to.eventually.be.rejected;
//     });
//     it('Deve disparar um "InvalidFieldsError" caso o model resolva sem encontrar um User', () => {
//       sinon.stub(User, 'findOne').resolves();
//       return chai.expect(usersService.VerifyEmailAndPassword({})).to.eventually.be.rejectedWith("Invalid fields");
//     });
//     it('Deve retonrar um objeto user caso User.findOne retorne um usuário', () => {
//       sinon.stub(User, 'findOne').resolves({user: 'teste'});
//       return chai.expect(usersService.VerifyEmailAndPassword({})).to.eventually.be.deep.equal({user: 'teste'});
//     });
//   });
// });