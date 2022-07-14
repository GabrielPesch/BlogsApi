// const { expect } = require('chai');
// const chai = require('chai');
// const Joi = require('joi');
// const sinon = require('sinon');
// const chaiAsPromised = require('chai-as-promised');
// const { runSchema } = require('../../../src/middlewares/validator');

// chai.use(chaiAsPromised);
// const schema = Joi.object()

// describe('validators', () => {
//   beforeEach(sinon.restore);

//   describe.only('runSchema', () => {
//     it('deve disparar um erro se o schema disparar um erro', () => {
//       error = new Error();
//       sinon.stub(schema, 'validate').throws(error);
//      expect(() => runSchema(schema)()).to.throw(error);
//     });

//     it('deve retornar algo se a validação for bem sucedida', () => {
//       sinon.stub(schema, 'validate').resolves({});
//       return chai.expect(runSchema(schema)()).to.be.undefined;
//     });
//   });
// });