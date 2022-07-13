const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../helpers/connection");
const productsModel = require("../../../models/productsModel");

describe("Testando o Model de produtos", () => {
  // const payloadProduct = {
  //   id: 1,
  //   name: "Produto 1",
  // };

  before(async () => {
    const execute = [
      {
        id: 1,
        name: "Produto 1",
      },
    ]; // retorno esperado nesse teste

    sinon.stub(connection, "execute").resolves(execute);
  });

  // Restauraremos a função `execute` original após os testes.
  after(async () => {
    connection.execute.restore();
  });

  describe("Testando os models de metodo Get", () => {
    it("Retorna um array com todos os objetos cadastrados", async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.a("array");
      expect(response[0]).to.be.a("object");
      expect(response[0].id).to.be.equal(1);
    });

    it('Retorna um objeto com o produto específico', async () => {
      const response = await productsModel.getById(1);

      expect(response).to.be.a("object");
      expect(response).to.have.property("id");
      expect(response.id).to.be.equal(1);
    });
  });
});
