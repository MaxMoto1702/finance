//= wrapped
//= require /angular/angular-resource

angular
    .module("finance.exchange")
    .factory("ExchangeDocument", ExchangeDocument);

function ExchangeDocument($resource) {
    var ExchangeDocument = $resource(
        "exchangeDocument/:id",
        {"id": "@id"},
        {
            "update": {method: "PUT"},
            "query": {method: "GET", isArray: true},
            "get": {method: 'GET'}
        }
    );

    ExchangeDocument.list = ExchangeDocument.query;

    ExchangeDocument.prototype.toString = function () {
        return 'finance.ExchangeDocument : ' + (this.id ? this.id : '(unsaved)');
    };

    return ExchangeDocument;
}
