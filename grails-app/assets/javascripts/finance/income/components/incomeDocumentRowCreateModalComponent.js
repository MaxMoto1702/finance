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
    })
    .controller('IncomeDocumentRowCreateController', IncomeDocumentRowCreateController);

function IncomeDocumentRowCreateController() {
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