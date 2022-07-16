// const chai = require('chai');
// const sinon = require('sinon');
// const chaiAsPromised = require('chai-as-promised');
// const { runSchema } = require('../../../src/middlewares/validator');
// const Joi = require('joi');

// chai.use(chaiAsPromised);

// const schema = Joi.object();

// describe('validators', () => {
//   beforeEach(sinon.restore);

//   describe('runSchema', () => {
//     it('deve disparar um erro se o schema disparar um erro', () => {
//       sinon.stub(schema, 'validateAsync').rejects();
//       return chai.expect(runSchema(schema)()).to.eventually.be.rejected;
//     });

//     it('deve retornar algo se a validação for bem sucedida', () => {
//       sinon.stub(schema, 'validateAsync').resolves();
//       return chai.expect(runSchema(schema)())
//       .to.eventually.be.undefined;
//     });
//   });
// });