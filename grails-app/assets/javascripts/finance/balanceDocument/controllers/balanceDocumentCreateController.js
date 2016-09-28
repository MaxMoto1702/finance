//= wrapped

angular
    .module("finance.balanceDocument")
    .controller("BalanceDocumentCreateController", BalanceDocumentCreateController);

function BalanceDocumentCreateController(BalanceDocument, $state) {

    var vm = this;

    vm.balanceDocument = new BalanceDocument();

    vm.saveBalanceDocument = function () {
        vm.errors = undefined;
        vm.balanceDocument.$save({}, function () {
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
