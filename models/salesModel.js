const connection = require('../helpers/connection');

const addToSales = async (date) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [date],
  );
  const result = {
    id: insertId,
    date,
  };
  return result;
};

const addToSalesProducts = async (saleId, productId, quantity) => {
  const [row] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return row;
};

module.exports = {
  addToSales,
  addToSalesProducts,
};
