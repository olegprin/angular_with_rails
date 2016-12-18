
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require bootstrap-sprockets


/*

= require oxymoron/angular
= require oxymoron/angular-resource
= require oxymoron/angular-cookies
= require oxymoron/angular-ui-router
= require oxymoron/ng-notify
= require oxymoron

//= require underscore
//= require gmaps/google

  require angular-recaptcha
  require paging
= require_self
= require_tree .
*/

var app = angular.module("app", ['ui.router', 'oxymoron']);

app.run(['$rootScope', function ($rootScope) {
  $rootScope.gon = gon;
  $rootScope.Routes = Routes;
}])