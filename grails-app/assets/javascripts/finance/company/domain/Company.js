//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.company")
    .factory("Company", Company);

function Company($resource) {
    var Company = $resource(
        "company/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    Company.list = Company.query;

    Company.prototype.toString = function () {
        return 'finance.Company : ' + (this.id ? this.id : '(unsaved)');
    };

    return Company;
}
