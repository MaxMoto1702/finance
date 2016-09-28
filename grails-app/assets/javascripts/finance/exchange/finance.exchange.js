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

angular.module("finance.exchange", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('exchange', {
            url: "/exchange",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('exchange.list', {
            url: "",
            templateUrl: "/finance/exchange/list.html",
            controller: "ExchangeListController as vm"
        })
        .state('exchange.create', {
            url: "/create",
            templateUrl: "/finance/exchange/create.html",
            controller: "ExchangeCreateController as vm"
        })
        .state('exchange.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/exchange/edit.html",
            controller: "ExchangeEditController as vm"
        })
        .state('exchange.show', {
            url: "/show/:id",
            templateUrl: "/finance/exchange/show.html",
            controller: "ExchangeShowController as vm"
        });
}
