//= wrapped

angular
    .module("finance.balanceDocument")
    .controller("BalanceDocumentShowController", BalanceDocumentShowController);

function BalanceDocumentShowController(BalanceDocument, $stateParams, $state) {
    var vm = this;

    BalanceDocument.get({id: $stateParams.id}, function (data) {
        vm.balanceDocument = new BalanceDocument(data);
    }, function () {
        $state.go('balanceDocument.list');
    });

    vm.process = function () {
        vm.errors = undefined;
        vm.balanceDocument.$process(function () {}, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

    vm.revoke = function () {
        vm.errors = undefined;
        vm.balanceDocument.$revoke(function () {}, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

    vm.delete = function () {
        vm.errors = undefined;
        vm.balanceDocument.$delete(function () {
            $state.go('balanceDocument.list');
        }, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

}
