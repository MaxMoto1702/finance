//= wrapped

angular
    .module("finance.balanceDocument")
    .controller("BalanceDocumentEditController", BalanceDocumentEditController);

function BalanceDocumentEditController(BalanceDocument, $stateParams, $state) {
    var vm = this;


    BalanceDocument.get({id: $stateParams.id}, function (data) {
        vm.balanceDocument = new BalanceDocument(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve balanceDocument with ID " + $stateParams.id}];
    });

    vm.updateBalanceDocument = function () {
        vm.errors = undefined;
        vm.balanceDocument.$update(function () {
            $state.go('balanceDocument.show', {id: vm.balanceDocument.id});
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
