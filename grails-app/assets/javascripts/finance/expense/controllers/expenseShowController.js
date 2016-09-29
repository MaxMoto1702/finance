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

    vm.process = function () {
        vm.errors = undefined;
        vm.expense.$process(function () {}, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

    vm.rollback = function () {
        vm.errors = undefined;
        vm.expense.$rollback(function () {}, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

    vm.delete = function () {
        vm.expense.$delete(function () {
            $state.go('expense.list');
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
