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

    vm.delete = function () {
        vm.balanceDocument.$delete(function () {
            $state.go('balanceDocument.list');
        }, function () {
            //on error
        });
    };

}
