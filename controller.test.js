const { spy } = require('sinon')
const { Database } = require('./database')
const { UsuariosController } = require('./controller')

let respostaEsperada

describe('Controller de usuários', () => {

    beforeAll(() => {
        respostaEsperada = [
            {
                id: 10,
                nome: 'João',
                email: 'emailteste@teste.com'
            }
        ]

    });
    it('fake', () => {

        const fakeDatabase = {
            findAll() {
                return respostaEsperada
            }
        }

        const controller = new UsuariosController(fakeDatabase)
        const response = controller.getAll()

        expect(response).toBe(respostaEsperada)
    });

    it('spy', () => {
        const findAll = spy(Database, 'findAll')
        const controller = new UsuariosController(Database)
        controller.getAll()

        assert.calledWith(findAll, 'usuarios')
        findAll.restore()
    });

    it('strub', () => {
     
        const findAll = stub(Database, 'findAll')
        findAll.withArgs('usuarios').returns(respostaEsperada)

        const controller = new UsuariosController(Database)
        const response = controller.getAll

        assert.calledWith(findAll, 'usuarios')
        expect(response).toEqual(respostaEsperada)

        findAll.restore()
    });

    it('mock', () => {

        const dbMock = mock(Database)
        dbMock.expects('findAll').once().withArgs('usuarios')

        const controller = new UsuariosController(Database)
        const response = controller.getAll()

        expect(response).toEqual(respostaEsperada)

        dbMock.verify()
        dbMock.restore()
    });
});