//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeShowController", ExchangeShowController);

function ExchangeShowController(ExchangeDocument, $stateParams, $state) {
    var vm = this;

    ExchangeDocument.get({id: $stateParams.id}, function (data) {
        vm.exchange = new ExchangeDocument(data);
    }, function () {
        $state.go('exchange.list');
    });

    vm.process = function () {
        vm.errors = undefined;
        vm.exchange.$process(function () {}, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

    vm.revoke = function () {
        vm.errors = undefined;
        vm.exchange.$revoke(function () {}, function (response) {
            var data = response.data;
            if (data.hasOwnProperty('message')) {
                vm.errors = [data];
            } else {
                vm.errors = data._embedded.errors;
            }
        });
    };

    vm.delete = function () {
        vm.exchange.$delete(function () {
            $state.go('exchange.list');
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
