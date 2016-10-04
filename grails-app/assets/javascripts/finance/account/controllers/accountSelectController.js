//= wrapped

angular.module('finance.account')
    .controller('AccountSelectController', AccountSelectController);

function AccountSelectController(Account) {
    var vm = this;

    if (vm.id === undefined) console.warn("Please set attribute 'id' for tag 'account-select'");
    if (vm.name === undefined) console.warn("Please set attribute 'name' for tag 'account-select'");

    vm.accounts = Account.list();
}