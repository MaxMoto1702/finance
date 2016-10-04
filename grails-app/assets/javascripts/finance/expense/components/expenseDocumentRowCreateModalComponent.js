//= wrapped

angular.module('finance.expense')
    .component('expenseDocumentRowCreateModalComponent', {
        templateUrl: '/finance/expense/createRow.html',
        controller: 'ExpenseDocumentRowCreateController',
        controllerAs: 'vm',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });