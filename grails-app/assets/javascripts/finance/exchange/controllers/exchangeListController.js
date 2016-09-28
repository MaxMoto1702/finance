//= wrapped

angular
    .module("finance.exchange")
    .controller("ExchangeListController", ExchangeListController);

function ExchangeListController(ExchangeDocument, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    ExchangeDocument.list({max: max, offset: offset}, function (data) {
        vm.exchangeList = data;
    });
}
