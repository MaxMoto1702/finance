//= wrapped

angular
    .module("finance.income")
    .controller("IncomeCreateController", IncomeCreateController);

function IncomeCreateController(IncomeDocument, Account, $state) {

    var vm = this;

    vm.accounts = Account.list();

    vm.income = new IncomeDocument();

    vm.saveIncome = function () {
        vm.errors = undefined;
        vm.income.$save({}, function () {
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
