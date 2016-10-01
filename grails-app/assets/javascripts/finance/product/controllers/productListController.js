//= wrapped

angular
    .module("finance.product")
    .controller("ProductListController", ProductListController);

function ProductListController(Product, $state) {
    var vm = this;

    vm.go = $state.go;

    var max = 10, offset = 0;

    Product.list({max: max, offset: offset}, function (data) {
        vm.productList = data;
    });
}
