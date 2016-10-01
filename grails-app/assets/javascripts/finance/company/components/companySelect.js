//= wrapped

angular.module('finance.company')
    .component('companySelect', {
        templateUrl: '/finance/company/select.html',
        controller: CompanySelectController,
        controllerAs: 'vm',
        bindings: {
            id: '@',
            name: '@',
            ngModel: '='
        }
    });

function CompanySelectController(Company) {
    var vm = this;

    if (vm.id === undefined) console.warn("Please set attribute 'id' for tag 'company-select'");
    if (vm.name === undefined) console.warn("Please set attribute 'name' for tag 'company-select'");

    vm.companies = Company.list();
}