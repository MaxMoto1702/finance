//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeEditController", ExchangeEditController);

function ExchangeEditController(Document, $stateParams, $state) {
    var vm = this;


    Document.get({id: $stateParams.id}, function (data) {
        vm.exchange = new Document(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve exchange with ID " + $stateParams.id}];
    });

    vm.updateExchange = function () {
        vm.errors = undefined;
        vm.exchange.$update(function () {
            $state.go('exchange.show', {id: vm.exchange.id});
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
