const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      let replaceRules = {
        test: /OrbitControls.js$/,
        loader: 'string-replace-loader',
        include: [
          path.resolve(__dirname, 'node_modules/three/examples/jsm/controls/'),
        ],
        options: {
          search: /function onMouseDown\( event \) {[.\s\S]*?event\.preventDefault\(\);/,
          replace: 'function onMouseDown( event ) {',
          flags: 'igm',
        },
      };

      webpackConfig.module.rules[1].oneOf.unshift(replaceRules);
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
