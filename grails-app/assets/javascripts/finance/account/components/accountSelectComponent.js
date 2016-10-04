//= wrapped

angular.module('finance.account')
    .component('accountSelect', {
        templateUrl: '/finance/account/select.html',
        controller: 'AccountSelectController',
        controllerAs: 'vm',
        bindings: {
            id: '@',
            name: '@',
            ngModel: '='
        }
    });