const {merge} = require('webpack-merge');
const commonConfiguration = require ('./webpack/common');

module.exports = (_env, { mode }) => {
    const propertyConfig = require(`./webpack/${mode}`);
    const mergeConfig = merge(commonConfiguration, propertyConfig);

    return mergeConfig;
}