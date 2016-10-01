//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseCreateController", ExpenseCreateController);

function ExpenseCreateController(ExpenseDocument, $uibModal, $state) {

    var vm = this;

    vm.expense = new ExpenseDocument();

    vm.addRow = function () {
        $uibModal
            .open({
                component: 'ExpenseDocumentRowCreateModalComponent',
                resolve: {}
            }).result
            .then(function (newRow) {
                if (vm.expense.rows === undefined) vm.expense.rows = [];
                vm.expense.rows.push(newRow);
                if (vm.expense.amount === undefined) vm.expense.amount = 0;
                vm.expense.amount += newRow.amount;
            });
    };

    vm.saveExpense = function () {
        vm.errors = undefined;
        vm.expense.$save({}, function () {
            $state.go('expense.show', {id: vm.expense.id});
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
