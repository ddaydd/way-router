Template.registerHelper('pathFor', function(routeName) {
  const i = dfm.arrayObjectIndexOf(Way.routes, routeName, 'name');
  return Way.routes[i].path;
});