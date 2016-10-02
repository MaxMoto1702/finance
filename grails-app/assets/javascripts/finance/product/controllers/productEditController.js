//= wrapped

angular
    .module("finance.product")
    .controller("ProductEditController", ProductEditController);

function ProductEditController(Product, $stateParams, $state) {
    var vm = this;

    vm.products = Product.list();

    Product.get({id: $stateParams.id}, function (data) {
        vm.product = new Product(data);
    }, function () {
        vm.errors = [{message: "Could not retrieve product with ID " + $stateParams.id}];
    });

    vm.updateProduct = function () {
        vm.errors = undefined;
        vm.product.$update(function () {
            $state.go('product.show', {id: vm.product.id});
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
