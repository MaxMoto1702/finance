//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeShowController", ExchangeShowController);

function ExchangeShowController(ExchangeDocument, $stateParams, $state) {
    var vm = this;

    ExchangeDocument.get({id: $stateParams.id}, function (data) {
        vm.exchange = new Document(data);
    }, function () {
        $state.go('exchange.list');
    });

    vm.delete = function () {
        vm.exchange.$delete(function () {
            $state.go('exchange.list');
        }, function () {
            //on error
        });
    };

}
