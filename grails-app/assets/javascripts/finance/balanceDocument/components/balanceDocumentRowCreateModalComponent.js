//= wrapped

angular.module('finance.balanceDocument')
    .component('balanceDocumentRowCreateModalComponent', {
        templateUrl: '/finance/balanceDocument/createRow.html',
        controller: 'BalanceDocumentRowCreateController',
        controllerAs: 'vm',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    })
    .controller('BalanceDocumentRowCreateController', BalanceDocumentRowCreateController);

function BalanceDocumentRowCreateController() {
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