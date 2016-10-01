//= wrapped

angular
    .module("finance.company")
    .controller("CompanyCreateController", CompanyCreateController);

function CompanyCreateController(Company, $state) {

    var vm = this;

    vm.company = new Company();

    vm.saveCompany = function () {
        vm.errors = undefined;
        vm.company.$save({}, function () {
            $state.go('company.show', {id: vm.company.id});
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
