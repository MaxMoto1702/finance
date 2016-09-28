//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.income")
    .factory("IncomeDocument", IncomeDocument);

function IncomeDocument($resource) {
    var IncomeDocument = $resource(
        "incomeDocument/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    IncomeDocument.list = IncomeDocument.query;

    IncomeDocument.prototype.toString = function () {
        return 'finance.Income2Document : ' + (this.id ? this.id : '(unsaved)');
    };

    return IncomeDocument;
}
