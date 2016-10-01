//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.operation")
    .factory("Operation", Operation);

function Operation($resource) {
    var Operation = $resource(
        "operation/:id",
        {"id": "@id"},
        {
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    Operation.list = Operation.query;

    Operation.prototype.toString = function () {
        return 'finance.Operation : ' + (this.id ? this.id : '(unsaved)');
    };

    return Operation;
}
