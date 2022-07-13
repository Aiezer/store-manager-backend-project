const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

describe("Testes do controller", () => {
  describe("Testa se o mock é válido", async () => {
    const res = {};
    const req = {};

    const mock = [
      {
        id: 1,
        name: "Produto 1",
      },
    ];

    before(async () => {
      res.json = sinon.stub().returns(mock);
      res.status = sinon.stub().returns(res);
      sinon.stub(productsService, "getAll").resolves(mock);
    });

    after(async () => {
      productsService.getAll.restore();
    });

    it("Testa se retorna o status 200", async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it("Testa se retorna um arquivo json", async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });
  });

  describe("Testa se o mock é inválido", async () => {
    const res = {};
    const req = {};

    before(async () => {
      req.body = {};
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);
      sinon.stub(productsService, "getAll").returns({});
    });

    after(async () => {
      productsService.getAll.restore();
    });

    it("É chamado o status com o código 400", async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(400)).to.be.equal(false);
    });

    it("É chamado um arquivo json", async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith({})).to.be.equal(true);
    });
  });
});
