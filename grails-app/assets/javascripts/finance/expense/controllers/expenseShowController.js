//= wrapped

angular
    .module("finance.expense")
    .controller("ExpenseShowController", ExpenseShowController);

function ExpenseShowController(ExpenseDocument, $stateParams, $state) {
    var vm = this;

    ExpenseDocument.get({id: $stateParams.id}, function (data) {
        vm.expense = new ExpenseDocument(data);
    }, function () {
        $state.go('expense.list');
    });

    vm.delete = function () {
        vm.expense.$delete(function () {
            $state.go('expense.list');
        }, function () {
            //on error
        });
    };

}
