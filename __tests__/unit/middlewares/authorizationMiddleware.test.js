const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const authService = require('../../../src/services/authService');
const authorizationMiddleware = require('../../../src/middlewares/authorizationMiddleware');

chai.use(chaiAsPromised);

describe('authorizationMiddleware', () => {
  beforeEach(sinon.restore);

  describe('validate', () => {
    it('deve disparar um erro se authService.validateAuthorization disparar um erro', () => {
      sinon.stub(authService, 'validateAuthorization').rejects();
      return chai.expect(authorizationMiddleware.validate({})).to.eventually.be.rejected;
    });

    it('deve disparar um erro se authService.readToken disparar um erro', () => {
      sinon.stub(authService, 'validateAuthorization').resolves();
      sinon.stub(authService, 'readToken').rejects();
      return chai.expect(authorizationMiddleware.validate({})).to.eventually.be.rejected;
    });

    it('Deve retornar undefined em caso de sucesso', () => {
      sinon.stub(authService, 'validateAuthorization').resolves();
      sinon.stub(authService, 'readToken').resolves();
      return chai.expect(authorizationMiddleware.validate({})).to.eventually.be.undefined;
    });
  });
});