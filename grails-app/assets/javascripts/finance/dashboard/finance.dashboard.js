//= wrapped
//= require /angular/angular
//= require /angular/ui-bootstrap-tpls
//= require /angular/angular-ui-router
//= require /finance/core/finance.core
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

angular.module("finance.dashboard", [
    "finance.core",
    "ui.bootstrap.dropdown",
    "ui.bootstrap.collapse",
    "ui.router"
])
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/finance/dashboard/dashboard.html"
        });

    $urlRouterProvider.otherwise('/');
}
