const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-reports',
  filename: 'remoteEntry.js',
  exposes: {
    './ReportsPage': './src/app/pages/reports/reports.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
