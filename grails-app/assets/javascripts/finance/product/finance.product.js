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

angular.module("finance.product", ["ui.router", "ngResource", "finance.core"]).config(config);

function config($stateProvider) {
    $stateProvider
        .state('product', {
            url: "/product",
            abstract: true,
            template: "<div ui-view></div>"
        })
        .state('product.list', {
            url: "",
            templateUrl: "/finance/product/list.html",
            controller: "ProductListController as vm"
        })
        .state('product.create', {
            url: "/create",
            templateUrl: "/finance/product/create.html",
            controller: "ProductCreateController as vm"
        })
        .state('product.edit', {
            url: "/edit/:id",
            templateUrl: "/finance/product/edit.html",
            controller: "ProductEditController as vm"
        })
        .state('product.show', {
            url: "/show/:id",
            templateUrl: "/finance/product/show.html",
            controller: "ProductShowController as vm"
        });
}
