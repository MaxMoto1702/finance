//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.product")
    .factory("Product", Product);

function Product($resource) {
    var Product = $resource(
        "product/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    Product.list = Product.query;

    Product.prototype.toString = function () {
        return 'finance.Product : ' + (this.id ? this.id : '(unsaved)');
    };

    return Product;
}
