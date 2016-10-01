//= wrapped

angular
    .module("finance.company")
    .controller("CompanyEditController", CompanyEditController);

function CompanyEditController(Company, $stateParams, $state) {
    var vm = this;


    Company.get({id: $stateParams.id}, function (data) {
        vm.company = new Company(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve company with ID " + $stateParams.id}];
    });

    vm.updateCompany = function () {
        vm.errors = undefined;
        vm.company.$update(function () {
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
