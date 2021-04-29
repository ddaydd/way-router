/**
 * https://medium.com/swlh/lets-code-a-client-side-router-for-your-no-framework-spa-19da93105e10
 * https://docs.meteor.com/packages/webapp.html
 */

const link = (path) => {
  const pushStateEvent = new CustomEvent("_pushstate", {detail: path});
  history.pushState({}, "wxc", path);
  dispatchEvent(pushStateEvent);
};

class Route {
  constructor(route) {
    this.name = route.name;
    this.path = route.path;
    if(route.waitOn) this.waitOnFn = route.waitOn;
    if(route.onBeforeAction) this.onBeforeAction = route.onBeforeAction;
    if(route.data) this.data = route.data;
  }

  setParams(params) {
    this.params = params;
  }

  waitOn(route, router) {
    const ctx = this;
    const subs = route.waitOnFn.call(ctx);
    Tracker.autorun(function() {
      if(subs.ready()) {
        if(router.renderedView) Blaze.remove(router.renderedView);
        router.renderedView = Route.view(route);
      }
      else {
        if(router.renderedView) Blaze.remove(router.renderedView);
        router.renderedView = Route.view({name: 'wayLoading'});
      }
    });
  }

  static view(route) {
    if(route.onBeforeAction) route.onBeforeAction();
    if(route.data)
      return Blaze.renderWithData(Template[route.name], route.data(), document.getElementById('yield'));
    else
      return Blaze.render(Template[route.name], document.getElementById('yield'));
  }
}

class Router {
  constructor(routes = [], renderNode) {
    this.routes = routes;
    this.renderNode = renderNode;
  }

  init() {
    this.navigate(location.pathname + location.hash);
  }

  addRoutes(routes) {
    this.routes = [...this.routes, ...routes];
  }

  route(route) {
    this.routes.push(new Route(route));
  }

  match(route, requestPath) {
    let paramNames = [];
    let regexPath =
      route.path.replace(/([:*])(\w+)/g, (full, colon, name) => {
        paramNames.push(name);
        return "([^/]+)";
      }) + "(?:/|$)";

    let params = {};
    let routeMatch = requestPath.match(new RegExp(regexPath));
    if(routeMatch !== null) {
      params = routeMatch.slice(1).reduce((params, value, index) => {
        if(params === null) params = {};
        params[paramNames[index]] = value;
        return params;
      }, null);
    }

    route.setParams(params);
    return routeMatch;
  }

  navigate(path, opts = {}) {
    const route = this.routes.filter((route) => this.match(route, path))[0];
    if(!route) {
      if(!opts.notPush) history.pushState({}, "", path);
      if(this.renderedView) Blaze.remove(this.renderedView);
      this.renderedView = Route.view({name: 'wayNotFound'});
    }
    else {
      if(!opts.notPush) history.pushState({}, "", path);
      if(this.renderedView) Blaze.remove(this.renderedView);
      if(route.waitOnFn) return route.waitOn(route, this);
      this.renderedView = Route.view(route);
    }
  }
}

export default Router;