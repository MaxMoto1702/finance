//= wrapped

angular.module('finance.company')
    .controller('CompanySelectController', CompanySelectController);

function CompanySelectController(Company) {
    var vm = this;

    if (vm.id === undefined) console.warn("Please set attribute 'id' for tag 'company-select'");
    if (vm.name === undefined) console.warn("Please set attribute 'name' for tag 'company-select'");

    vm.companies = Company.list();
}