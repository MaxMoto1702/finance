//= wrapped

angular
    .module("finance.company")
    .controller("CompanyListController", CompanyListController);

function CompanyListController(Company, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    Company.list({max: max, offset: offset}, function (data) {
        vm.companyList = data;
    });
}
