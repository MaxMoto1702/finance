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

angular.module("finance.balanceDocument", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('balanceDocument', {
            url: "/balanceDocument",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('balanceDocument.list', {
            url: "",
            templateUrl: "/finance/balanceDocument/list.html",
            controller: "BalanceDocumentListController as vm"
        })
        .state('balanceDocument.create', {
            url: "/create",
            templateUrl: "/finance/balanceDocument/create.html",
            controller: "BalanceDocumentCreateController as vm"
        })
        .state('balanceDocument.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/balanceDocument/edit.html",
            controller: "BalanceDocumentEditController as vm"
        })
        .state('balanceDocument.show', {
            url: "/show/:id",
            templateUrl: "/finance/balanceDocument/show.html",
            controller: "BalanceDocumentShowController as vm"
        });
}
