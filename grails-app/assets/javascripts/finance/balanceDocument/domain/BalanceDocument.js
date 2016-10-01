//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.balanceDocument")
    .factory("BalanceDocument", BalanceDocument);

function BalanceDocument($resource) {
    var BalanceDocument = $resource(
        "balanceDocument/:id/:action",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'},
            "process": {method: "POST", params: {action: 'process'}},
            "revoke": {method: "POST", params: {action: 'revoke'}}
        }
    );

    BalanceDocument.list = BalanceDocument.query;

    BalanceDocument.prototype.toString = function () {
        return 'finance.BalanceDocument : ' + (this.id ? this.id : '(unsaved)');
    };

    return BalanceDocument;
}
