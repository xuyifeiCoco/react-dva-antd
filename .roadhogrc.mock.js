const mock = {};

require('fs').readdirSync(require('path').join(__dirname + '/mock'))
  .forEach(function (file) {
    if (file === "mock.js") {
      Object.assign(mock, require('./mock/' + file));
    }
  });

module.exports = mock;
