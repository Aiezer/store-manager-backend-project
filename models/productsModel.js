const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id = ?`,
    [id],
  );
  return rows;
};

const add = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const result = {
    id: insertId,
    name,
  };
  return result;
};

const update = async (id, name) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
    [name, id],
  );

  return result.affectedRows;
};

const exclude = async (id) =>
  connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = ?`,
    [id],
  );

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
};
