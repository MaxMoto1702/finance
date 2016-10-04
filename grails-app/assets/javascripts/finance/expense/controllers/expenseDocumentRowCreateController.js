//= wrapped

angular.module('finance.expense')
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