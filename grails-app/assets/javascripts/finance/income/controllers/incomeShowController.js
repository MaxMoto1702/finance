//= wrapped

angular
    .module("finance.income")
    .controller("IncomeShowController", IncomeShowController);

function IncomeShowController(IncomeDocument, $stateParams, $state) {
    var vm = this;

    IncomeDocument.get({id: $stateParams.id}, function (data) {
        vm.income = new IncomeDocument(data);
    }, function () {
        $state.go('income.list');
    });

    vm.process = function () {
        vm.errors = undefined;
        vm.income.$process(function () {}, function (response) {
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
        vm.income.$rollback(function () {}, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

    vm.delete = function () {
        vm.income.$delete(function () {
            $state.go('income.list');
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
