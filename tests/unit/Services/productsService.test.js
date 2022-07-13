const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");

describe("Testando os Services de produtos", () => {
  const mock = [
    {
      id: 1,
      name: "Produto 1",
    },
  ];

  before(async () => {
    sinon.stub(productsModel, "getById").returns(mock[0]);
    sinon.stub(productsModel, "getAll").returns(mock);
  });

  after(async () => {
    productsModel.getAll.restore();
    productsModel.getById.restore();
  });

  describe("Testando os services de metodo Get", () => {
    it("Retorna um objeto com o produto específico", async () => {
      const result = await productsService.getById(1);
      expect(result).to.be.a("object");
      expect(result).to.have.property("id");
      expect(result.id).to.be.equal(1);
    });

    it("Retorna um array com todos os objetos cadastrados", async () => {
      const result = await productsService.getAll();
      expect(result).to.be.a("array");
    });
  });
});
