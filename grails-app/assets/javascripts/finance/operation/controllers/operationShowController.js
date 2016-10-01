//= wrapped

angular
    .module("finance.operation")
    .controller("OperationShowController", OperationShowController);

function OperationShowController(Operation, $stateParams, $state) {
    var vm = this;

    Operation.get({id: $stateParams.id}, function (data) {
        vm.operation = new Operation(data);
    }, function () {
        $state.go('operation.list');
    });

    vm.delete = function () {
        vm.errors = undefined;
        vm.operation.$delete(function () {
            $state.go('operation.list');
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
