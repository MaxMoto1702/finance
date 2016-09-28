//= wrapped

angular
    .module("finance.income")
    .controller("IncomeListController", IncomeListController);

function IncomeListController(IncomeDocument, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    IncomeDocument.list({max: max, offset: offset}, function (data) {
        vm.incomeList = data;
    });
}
