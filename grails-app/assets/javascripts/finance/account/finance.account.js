//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /finance/core/finance.core
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree components
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("finance.account", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('account', {
            url: "/account",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('account.list', {
            url: "",
            templateUrl: "/finance/account/list.html",
            controller: "AccountListController as vm"
        })
        .state('account.create', {
            url: "/create",
            templateUrl: "/finance/account/create.html",
            controller: "AccountCreateController as vm"
        })
        .state('account.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/account/edit.html",
            controller: "AccountEditController as vm"
        })
        .state('account.show', {
            url: "/show/:id",
            templateUrl: "/finance/account/show.html",
            controller: "AccountShowController as vm"
        });
}
