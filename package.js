Package.describe({
  name: 'dfm:way-router',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'simple meteor router',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ddaydd/way-router',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('2.2');
  api.use('templating');
  api.use('ecmascript');
  api.mainModule('./client/main.js', 'client');
  // api.mainModule('./server/main.js', 'server');
  api.export('Way');
});
