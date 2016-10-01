//= wrapped

angular
    .module("finance.income")
    .controller("IncomeEditController", IncomeEditController);

function IncomeEditController(IncomeDocument, $stateParams, $state) {
    var vm = this;

    Document.get({id: $stateParams.id}, function (data) {
        vm.income = new IncomeDocument(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve income with ID " + $stateParams.id}];
    });

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
