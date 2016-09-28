//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeCreateController", ExchangeCreateController);

function ExchangeCreateController(ExchangeDocument, Account, $state) {

    var vm = this;

    vm.accounts = Account.list();

    vm.exchange = new ExchangeDocument();

    vm.saveExchange = function () {
        vm.errors = undefined;
        vm.exchange.$save({}, function () {
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
