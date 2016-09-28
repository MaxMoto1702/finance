//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.expense")
    .factory("ExpenseDocument", ExpenseDocument);

function ExpenseDocument($resource) {
    var ExpenseDocument = $resource(
        "expenseDocument/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    ExpenseDocument.list = ExpenseDocument.query;

    ExpenseDocument.prototype.toString = function () {
        return 'finance.ExpenseDocument : ' + (this.id ? this.id : '(unsaved)');
    };

    return ExpenseDocument;
}
