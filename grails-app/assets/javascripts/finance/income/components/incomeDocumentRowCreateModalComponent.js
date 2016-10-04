//= wrapped

angular.module('finance.income')
    .component('incomeDocumentRowCreateModalComponent', {
        templateUrl: '/finance/income/createRow.html',
        controller: 'IncomeDocumentRowCreateController',
        controllerAs: 'vm',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });