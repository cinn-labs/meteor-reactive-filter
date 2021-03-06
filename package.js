Package.describe({
  name: 'cinn:reactive-filter',
  version: '0.0.2',
  summary: 'Reactive filter helper for Meteor + React apps',
  git: 'https://github.com/cinn-labs/meteor-reactive-filter',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4');
  api.use('ecmascript');
  api.use('tracker');
  api.use('cinn:react-infinite-scroll@0.0.2');
  api.use('ecmascript');

  api.export('Filter');
  api.export('FiltersHandler');

  api.addFiles('filter.jsx', 'client');
  api.addFiles('filters-handler.jsx', 'client');
});
