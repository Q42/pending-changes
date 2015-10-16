Package.describe({
  name: 'q42:pending-changes',
  version: '0.0.1',
  summary: 'Keep track of pending changes on collections',
  git: 'https://github.com/Q42/pending-changes',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.4-logging.0');
  api.use('ecmascript');
  api.addFiles('pending-changes.js');
});
