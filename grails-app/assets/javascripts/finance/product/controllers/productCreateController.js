//= wrapped

angular
    .module("finance.product")
    .controller("ProductCreateController", ProductCreateController);

function ProductCreateController(Product, $state) {

    var vm = this;

    vm.product = new Product();

    vm.saveProduct = function () {
        vm.errors = undefined;
        vm.product.$save({}, function () {
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
