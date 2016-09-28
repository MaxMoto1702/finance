//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseCreateController", ExpenseCreateController);

function ExpenseCreateController(ExpenseDocument, Account, $state) {

    var vm = this;

    vm.accounts = Account.list();

    vm.expense = new ExpenseDocument();

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
