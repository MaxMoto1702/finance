//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseEditController", ExpenseEditController);

function ExpenseEditController(ExpenseDocument, $stateParams, $state) {
    var vm = this;

    ExpenseDocument.get({id: $stateParams.id}, function (data) {
        vm.expense = new ExpenseDocument(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve expense with ID " + $stateParams.id}];
    });

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

    vm.updateExpense = function () {
        vm.errors = undefined;
        vm.expense.$update(function () {
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
