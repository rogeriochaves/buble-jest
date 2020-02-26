var babel = require('@babel/core');
var buble = require('buble');
var cosmiconfig = require('cosmiconfig');

var explorer = cosmiconfig('buble', {
  sync: true
}).load();
var options = explorer ? explorer.config : {}


module.exports = {
  process: (src, filename) => {
    var babelResult = babel.transformSync(src, {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
      sourceMaps: true,
      filename: filename
    });

    var { code } = buble.transform(babelResult.code, options);
    return { code: code, map: babelResult.map };
  }
};
