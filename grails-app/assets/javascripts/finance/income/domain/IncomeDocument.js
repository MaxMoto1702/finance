//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.income")
    .factory("IncomeDocument", IncomeDocument);

function IncomeDocument($resource) {
    var IncomeDocument = $resource(
        "incomeDocument/:id/:action",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'},
            "process": {method: "POST", params: {action: 'process'}},
            "rollback": {method: "POST", params: {action: 'rollback'}}
        }
    );

    IncomeDocument.list = IncomeDocument.query;

    IncomeDocument.prototype.toString = function () {
        return 'finance.Income2Document : ' + (this.id ? this.id : '(unsaved)');
    };

    return IncomeDocument;
}
