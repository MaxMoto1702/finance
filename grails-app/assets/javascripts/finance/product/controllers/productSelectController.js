//= wrapped

angular.module('finance.product')
    .controller('ProductSelectController', ProductSelectController);

function ProductSelectController(Product) {
    var vm = this;

    if (vm.id === undefined) console.warn("Please set attribute 'id' for tag 'product-select'");
    if (vm.name === undefined) console.warn("Please set attribute 'name' for tag 'product-select'");

    vm.companies = Product.list();
}