const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { User } = require('../../../src/database/models');
const usersService = require('../../../src/services/usersService');
const { ADD_USER_BODY, ADD_USER_BODY_WITHOUT_PASSWORD } = require('../../utils/constants');

chai.use(chaiAsPromised);

describe('services/userService', () => {
  beforeEach(sinon.restore);
  
  describe('verifyEmailAndPassword', () => {
    it('Deve disparar um erro caso User.findOne também dispare', () => {
      sinon.stub(User, 'findOne').rejects();
      return chai.expect(usersService.verifyEmailAndPassword({})).to.eventually.be.rejected;
    });

    it('Deve disparar um "InvalidFieldsError" caso o model resolva sem encontrar um User', () => {
      sinon.stub(User, 'findOne').resolves();
      return chai.expect(usersService.verifyEmailAndPassword({})).to.eventually.be.rejectedWith("Invalid fields");
    });

    it('Deve retornar um objeto user caso User.findOne retorne um usuário', () => {
      sinon.stub(User, 'findOne').resolves({user: 'teste'});
      return chai.expect(usersService.verifyEmailAndPassword({})).to.eventually.be.deep.equal({user: 'teste'});
    });

  });

  describe('findOrCreate', () => {
    it('Deve disparar um erro caso User.findOrCreate também dispare', () => {
      sinon.stub(User, 'findOrCreate').rejects();
      return chai.expect(usersService.findOrCreate('')).to.eventually.be.rejected;
    });

    it('Deve disparar um "User already registered" caso User.findOrCreate retorne created como False', () => {
      sinon.stub(User, 'findOrCreate').resolves([{}, false]);
      return chai.expect(usersService.findOrCreate('')).to.eventually.be.rejectedWith('User already registered');
    });

    it('Deve retornar um usuário sem a senha caso User.findOrCreate retorne created como true', () => {
      sinon.stub(User, 'findOrCreate').resolves([{dataValues: ADD_USER_BODY }, true]);
      return chai.expect(usersService.findOrCreate('')).to.eventually.be.deep.equal(ADD_USER_BODY_WITHOUT_PASSWORD);
    });
  });

  describe('getAll', () => {
    it('Deve disparar um erro caso User.findAll também dispare', () => {
      sinon.stub(User, 'findAll').rejects();
      return chai.expect(usersService.getAll()).to.eventually.be.rejected;
    });

    it('Deve retornar um array caso User.findAll tenha sucesso', () => {
      sinon.stub(User, 'findAll').resolves([{}]);
      return chai.expect(usersService.getAll()).to.eventually.be.deep.equal([{}]);
    });
  });

  describe('findById', () => {
    it('Deve disparar um erro caso User.findByPk também dispare', () => {
      sinon.stub(User, 'findByPk').rejects();
      return chai.expect(usersService.findById()).to.eventually.be.rejected;
    });

    it('Deve disparar um "UserNotFoundError" caso o model resolva sem encontrar um User', () => {
      sinon.stub(User, 'findByPk').resolves(null);
      return chai.expect(usersService.findById({})).to.eventually.be.rejectedWith("User does not exist");
    });

    it('Deve retornar um objeto user caso User.findByPk retorne um usuário', () => {
      sinon.stub(User, 'findByPk').resolves({user: 'teste'});
      return chai.expect(usersService.findById({})).to.eventually.be.deep.equal({user: 'teste'});
    });
  });
});