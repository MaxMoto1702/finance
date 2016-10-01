//= wrapped

angular.module('finance.product')
    .component('productSelect', {
        templateUrl: '/finance/product/select.html',
        controller: ProductSelectController,
        controllerAs: 'vm',
        bindings: {
            id: '@',
            name: '@',
            ngModel: '='
        }
    });

function ProductSelectController(Product) {
    var vm = this;

    if (vm.id === undefined) console.warn("Please set attribute 'id' for tag 'product-select'");
    if (vm.name === undefined) console.warn("Please set attribute 'name' for tag 'product-select'");

    vm.companies = Product.list();
}