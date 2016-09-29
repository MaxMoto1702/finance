//= wrapped
//= require /angular/angular 
//= require /angular/angular-ui-router
//= require /angular/angular-resource
//= require /finance/core/finance.core
//= require /finance/account/finance.account
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree components
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular.module("finance.income", ["ui.router", "ngResource", "finance.core", "finance.account"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('income', {
            url: "/income",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('income.list', {
            url: "",
            templateUrl: "/finance/income/list.html",
            controller: "IncomeListController as vm"
        })
        .state('income.create', {
            url: "/create",
            templateUrl: "/finance/income/create.html",
            controller: "IncomeCreateController as vm"
        })
        .state('income.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/income/edit.html",
            controller: "IncomeEditController as vm"
        })
        .state('income.show', {
            url: "/show/:id",
            templateUrl: "/finance/income/show.html",
            controller: "IncomeShowController as vm"
        });
}
