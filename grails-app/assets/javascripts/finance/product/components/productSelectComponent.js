//= wrapped

angular.module('finance.product')
    .component('productSelect', {
        templateUrl: '/finance/product/select.html',
        controller: 'ProductSelectController',
        controllerAs: 'vm',
        bindings: {
            id: '@',
            name: '@',
            ngModel: '='
        }
    });