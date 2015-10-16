Package.describe({
  name: 'q42:pending-changes',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.4-logging.0');
  api.use('ecmascript');
  api.addFiles('pending-changes.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('q42:pending-changes');
  api.addFiles('pending-changes-tests.js');
});
