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
    })
    .controller('ExpenseDocumentRowCreateController', ExpenseDocumentRowCreateController);

function ExpenseDocumentRowCreateController() {
    var vm = this;

    vm.row = {};

    vm.$onInit = function () {
        console.log('initial modal instance')
    };

    vm.save = function () {
        vm.close({$value: vm.row});
    };

    vm.cancel = function () {
        vm.dismiss({$value: 'cancel'});
    };
}