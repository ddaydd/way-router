import {Template} from 'meteor/templating';
import './yield.html';

import Router from '../way.js';

Way = new Router();

Template.yield.onCreated(function() {
});

Template.yield.onRendered(function() {

  document.body.addEventListener('click', function(e) {
    const target = e.target.tagName;
    if(target !== 'A') return;
    e.preventDefault();

    Way.navigate(e.target.getAttribute("href"));
  });

  Way.init();
  window.addEventListener("_pushstate", (e) => {
    Way.navigate(e.detail);
  });

  window.addEventListener('popstate', function(e) {
    Way.navigate(location.pathname, {notPush: true});
  });

});