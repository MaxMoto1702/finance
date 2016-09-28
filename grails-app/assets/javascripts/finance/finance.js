//= wrapped
//= require /angular/angular
//= require /angular/ui-bootstrap-tpls
//= require /finance/core/finance.core
//= require /finance/index/finance.index
//= require /finance/dashboard/finance.dashboard
//= require /finance/account/finance.account
//= require /finance/balanceDocument/finance.balanceDocument
//= require /finance/income/finance.income
//= require /finance/expense/finance.expense
//= require /finance/exchange/finance.exchange

angular.module("finance", [
    "finance.core",
    "finance.index",
    "finance.dashboard",
    "finance.account",
    "finance.balanceDocument",
    "finance.income",
    "finance.expense",
    "finance.exchange",
    "ui.bootstrap"
]);
