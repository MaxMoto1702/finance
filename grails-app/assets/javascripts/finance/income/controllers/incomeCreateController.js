//= wrapped

angular
    .module("finance.income")
    .controller("IncomeCreateController", IncomeCreateController);

function IncomeCreateController(IncomeDocument, Account, $uibModal, $state) {

    var vm = this;

    vm.accounts = Account.list();

    vm.income = new IncomeDocument();

    vm.addRow = function () {
        $uibModal
            .open({
                component: 'IncomeDocumentRowCreateModalComponent',
                resolve: {}
            }).result
            .then(function (newRow) {
                if (vm.income.rows === undefined) vm.income.rows = [];
                vm.income.rows.push(newRow);
                if (vm.income.amount === undefined) vm.income.amount = 0;
                vm.income.amount += newRow.amount;
            });
    };

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
