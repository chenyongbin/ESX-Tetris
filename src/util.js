const extend = function(dest, source) {
  for (let p in source) {
    if (p in dest) {
      dest[p] = source[p];
    }
  }
};

export { extend };
