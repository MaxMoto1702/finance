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

angular.module("finance.expense", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('expense', {
            url: "/expense",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('expense.list', {
            url: "",
            templateUrl: "/finance/expense/list.html",
            controller: "ExpenseListController as vm"
        })
        .state('expense.create', {
            url: "/create",
            templateUrl: "/finance/expense/create.html",
            controller: "ExpenseCreateController as vm"
        })
        .state('expense.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/expense/edit.html",
            controller: "ExpenseEditController as vm"
        })
        .state('expense.show', {
            url: "/show/:id",
            templateUrl: "/finance/expense/show.html",
            controller: "ExpenseShowController as vm"
        });
}
