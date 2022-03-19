import ItemRepository from "./repositories/Login";

const repositories = {
  items: ItemRepository,
};
export default {
  get: (name) => repositories[name],
};
