const salesModel = require('../models/salesModel');
const getDateAndTime = require('../helpers/getDateAndTime');

const add = async (sales) => {
  // const isArray = Array.isArray(sales);
  // if (!isArray) {
  //   const { productId, quantity } = sales;
  // }
  const date = getDateAndTime();
  const addSale = await salesModel.addToSales(date);
  sales.map(async (sale) => {
    const { productId, quantity } = sale;
    if (!productId || !quantity) return false;
    await salesModel.addToSalesProducts(addSale.id, productId, quantity);
    return addSale;
  });
  const result = {
    id: addSale.id,
    itemsSold: sales,
  };
  return result;
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  if (!sales) return [];
  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (!sale) return [];
  return sale;
};

const exclude = async (id) => {
  const result = await salesModel.excludeFromSales(id);
  if (result < 1) return false;
  return true;
};

const updateSaleById = async (saleId, arrayUpdate) => {
  arrayUpdate.map(async (n) => {
    await salesModel.updateSaleById(saleId, n.productId, n.quantity);
  });
  // if (result.some((e) => e < 1)) return false;
  return true;
};

module.exports = {
  add,
  getAllSales,
  getSaleById,
  exclude,
  updateSaleById,
};
