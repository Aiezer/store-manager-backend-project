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

const serializeAllSales = (sales) =>
  sales.map(({ id, date, product_id: productId, quantity }) => ({
    saleId: id,
    date,
    productId,
    quantity,
  }));

const serializeSaleById = (sale) =>
  sale.map(({ date, product_id: productId, quantity }) => ({
    date,
    productId,
    quantity,
  }));

const getAllSales = async () => {
  const query = `SELECT id, date, product_id, quantity
  FROM sales
  JOIN sales_products
  ON sales.id = sales_products.sale_id
  ORDER BY id, product_id;`;

  const [sales] = await connection.execute(query);

  return serializeAllSales(sales);
};

const getSaleById = async (id) => {
  const query = `SELECT date, product_id, quantity
  FROM sales
  JOIN sales_products
  ON sales.id = sales_products.sale_id
  WHERE id = ?
  ORDER BY id, product_id;`;

  const [sale] = await connection.execute(query, [id]);

  return serializeSaleById(sale);
};

const excludeFromSales = async (id) => {
  const [exclude] = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = ?`,
    [id],
    );
    return exclude.affectedRows;
  };

module.exports = {
  addToSales,
  addToSalesProducts,
  getAllSales,
  getSaleById,
  excludeFromSales,
};
