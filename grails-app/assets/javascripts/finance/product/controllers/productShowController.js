//= wrapped

angular
    .module("finance.product")
    .controller("ProductShowController", ProductShowController);

function ProductShowController(Product, $stateParams, $state) {
    var vm = this;

    Product.get({id: $stateParams.id}, function (data) {
        vm.product = new Product(data);
    }, function () {
        $state.go('product.list');
    });

    vm.delete = function () {
        vm.errors = undefined;
        vm.product.$delete(function () {
            $state.go('product.list');
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
