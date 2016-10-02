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
        // FAKE
        angular.forEach(vm.productList, function (product) {
            Product.list({}, function(data1){
                product.subProducts = data1;
                angular.forEach(vm.subProducts, function (product) {
                    Product.list({}, function(data2) {
                        product.subProducts = data2;
                    });
                });
            });
        })
    });

    vm.expand = function (product) {
        return product.children = Product.list();
    }
}
