const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const loginService = require('../../../src/services/loginService');
const loginController = require('../../../src/controllers/loginController');
const usersService = require('../../../src/services/usersService');
const authService = require('../../../src/services/authService');

const { makeRes } = require('../../utils/mocks');
const { TOKEN } = require('../../utils/constants')

chai.use(chaiAsPromised);

describe('controllers/loginController', () => {
  beforeEach(sinon.restore);
  
  describe('login', () => {
    it('Deve disparar um erro se loginService.validateBodyLogin disparar um erro', () => {
      sinon.stub(loginService, 'validateBodyLogin').rejects();
      return chai.expect(loginController.login({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro se usersService.VerifyEmailAndPassword disparar um erro', () => {
      sinon.stub(loginService, 'validateBodyLogin').resolves();
      sinon.stub(usersService, 'VerifyEmailAndPassword').rejects();
      return chai.expect(loginController.login({}, {})).to.eventually.be.rejected;
    });
    it('Deve disparar um erro se authService.makeToken disparar um erro', () => {
      sinon.stub(loginService, 'validateBodyLogin').resolves();
      sinon.stub(usersService, 'VerifyEmailAndPassword').resolves();
      sinon.stub(authService, 'makeToken').rejects();
      return chai.expect(loginController.login({}, {})).to.eventually.be.rejected;
    });
    it('Deve chamar o status "200" e retornar o token', async () => {
      sinon.stub(loginService, 'validateBodyLogin').resolves();
      sinon.stub(usersService, 'VerifyEmailAndPassword').resolves();
      sinon.stub(authService, 'makeToken').resolves(TOKEN);
      const res = makeRes();
      await loginController.login({}, res);
      return chai.expect(res.json.getCall(0).args[0]).to.deep.equal({token: TOKEN});
    });
  });
});