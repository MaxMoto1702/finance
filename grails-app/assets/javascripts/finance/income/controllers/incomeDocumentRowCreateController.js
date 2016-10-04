//= wrapped

angular.module('finance.income')
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