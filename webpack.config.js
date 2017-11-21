const path = require('path');

module.exports = function (env) {
    const webpackConfigPath = path.resolve(__dirname, 'config', `${env}.webpack.config.js`);

    console.log(webpackConfigPath, env);
    return require(webpackConfigPath)(env);
};
