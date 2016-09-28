//= wrapped

angular
    .module("finance.income")
    .controller("IncomeEditController", IncomeEditController);

function IncomeEditController(IncomeDocument, Account, $stateParams, $state) {
    var vm = this;

    vm.accounts = Account.list();

    Document.get({id: $stateParams.id}, function (data) {
        vm.income = new IncomeDocument(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve income with ID " + $stateParams.id}];
    });

    vm.updateIncome = function () {
        vm.errors = undefined;
        vm.income.$update(function () {
            $state.go('income.show', {id: vm.income.id});
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
