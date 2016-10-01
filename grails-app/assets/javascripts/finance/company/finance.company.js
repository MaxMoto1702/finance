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

angular.module("finance.company", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('company', {
            url: "/company",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('company.list', {
            url: "",
            templateUrl: "/finance/company/list.html",
            controller: "CompanyListController as vm"
        })
        .state('company.create', {
            url: "/create",
            templateUrl: "/finance/company/create.html",
            controller: "CompanyCreateController as vm"
        })
        .state('company.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/company/edit.html",
            controller: "CompanyEditController as vm"
        })
        .state('company.show', {
            url: "/show/:id",
            templateUrl: "/finance/company/show.html",
            controller: "CompanyShowController as vm"
        });
}
