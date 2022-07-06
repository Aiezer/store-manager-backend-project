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

module.exports = {
  add,
  getAllSales,
  getSaleById,
};
