//= wrapped

angular.module('finance.company')
    .component('companySelect', {
        templateUrl: '/finance/company/select.html',
        controller: 'CompanySelectController',
        controllerAs: 'vm',
        bindings: {
            id: '@',
            name: '@',
            ngModel: '='
        }
    });