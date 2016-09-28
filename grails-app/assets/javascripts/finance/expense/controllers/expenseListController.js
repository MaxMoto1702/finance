//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseListController", ExpenseListController);

function ExpenseListController(ExpenseDocument, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    ExpenseDocument.list({max: max, offset: offset}, function (data) {
        vm.expenseList = data;
    });
}
