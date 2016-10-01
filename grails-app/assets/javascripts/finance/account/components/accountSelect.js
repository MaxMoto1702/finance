//= wrapped

angular.module('finance.account')
.component('accountSelect', {
    templateUrl: '/finance/account/select.html',
    controller: AccountSelectController,
    controllerAs: 'vm',
    bindings: {
        id: '@',
        name: '@',
        ngModel: '='
    }
});

function AccountSelectController(Account) {
    var vm = this;

    if (vm.id === undefined) console.warn("Please set attribute 'id' for tag 'account-select'");
    if (vm.name === undefined) console.warn("Please set attribute 'name' for tag 'account-select'");

    vm.accounts = Account.list();
}