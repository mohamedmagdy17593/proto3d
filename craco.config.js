const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      let rules = [
        {
          test: /OrbitControls.js$/,
          loader: 'string-replace-loader',
          include: [
            path.resolve(
              __dirname,
              'node_modules/three/examples/jsm/controls/',
            ),
          ],
          options: {
            search: /function onMouseDown\( event \) {[.\s\S]*?event\.preventDefault\(\);/,
            replace: 'function onMouseDown( event ) {',
            flags: 'igm',
          },
        },
        {
          test: /\.js$/,
          loader: 'string-replace-loader',
          include: [path.resolve(__dirname, 'node_modules/rc-color-picker/')],
          options: {
            search: `componentWillMount`,
            replace: 'UNSAFE_componentWillMount',
          },
        },
        {
          test: /\.js$/,
          loader: 'string-replace-loader',
          include: [path.resolve(__dirname, 'node_modules/rc-color-picker/')],
          options: {
            search: `componentWillReceiveProps`,
            replace: 'UNSAFE_componentWillReceiveProps',
          },
        },
      ];

      webpackConfig.module.rules[1].oneOf.unshift(...rules);
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
