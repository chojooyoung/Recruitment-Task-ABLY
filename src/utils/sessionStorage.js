export default window.sStorage = window.sessionStorage
|| (function () {
  // eslint-disable-next-line no-restricted-globals
  const winObj = opener || window;
  const data = JSON.parse(winObj.top.name || "{}");
  const fn = {
    length: Object.keys(data).length,
    setItem(key, value) {
      data[key] = `${value}`;
      winObj.top.name = JSON.stringify(data);
      // eslint-disable-next-line no-plusplus
      fn.length++;
    },
    getItem(key) {
      return data[key] || null;
    },
    key(idx) {
      return Object.keys(data)[idx] || null;
    },
    removeItem(key) {
      delete data[key];
      winObj.top.name = JSON.stringify(data);
      // eslint-disable-next-line no-plusplus
      fn.length--;
    },
    clear() {
      winObj.top.name = "{}";
      fn.length = 0;
    },
  };
  return fn;
}());
