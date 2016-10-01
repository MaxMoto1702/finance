//= wrapped

angular
    .module("finance.operation")
    .controller("OperationListController", OperationListController);

function OperationListController(Operation, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    Operation.list({max: max, offset: offset}, function (data) {
        vm.operationList = data;
    });
}
