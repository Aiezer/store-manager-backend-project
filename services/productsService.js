const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  if (!result) return [];
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return [];
  return result;
};

const add = async (name) => {
  if (!name) return false;

  const result = await productsModel.add(name);
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
};
