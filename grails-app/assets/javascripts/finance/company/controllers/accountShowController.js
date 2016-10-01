//= wrapped

angular
    .module("finance.company")
    .controller("CompanyShowController", CompanyShowController);

function CompanyShowController(Company, $stateParams, $state) {
    var vm = this;

    Company.get({id: $stateParams.id}, function (data) {
        vm.company = new Company(data);
    }, function () {
        $state.go('company.list');
    });

    vm.delete = function () {
        vm.errors = undefined;
        vm.company.$delete(function () {
            $state.go('company.list');
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
