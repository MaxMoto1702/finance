//= wrapped

angular
    .module("finance.balanceDocument")
    .controller("BalanceDocumentListController", BalanceDocumentListController);

function BalanceDocumentListController(BalanceDocument, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    BalanceDocument.list({max: max, offset: offset}, function (data) {
        vm.balanceDocumentList = data;
    });
}
