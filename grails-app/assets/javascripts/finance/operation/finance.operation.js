//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /finance/core/finance.core
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("finance.operation", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('operation', {
            url: "/operation",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('operation.list', {
            url: "",
            templateUrl: "/finance/operation/list.html",
            controller: "OperationListController as vm"
        })
        .state('operation.show', {
            url: "/show/:id",
            templateUrl: "/finance/operation/show.html",
            controller: "OperationShowController as vm"
        });
}
