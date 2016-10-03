//= wrapped
//= require /angular/angular
//= require /angular/ui-bootstrap-tpls
//= require /finance/core/finance.core
//= require /finance/l10n/finance.l10n
//= require /finance/index/finance.index
//= require /finance/dashboard/finance.dashboard
//= require /finance/account/finance.account
//= require /finance/company/finance.company
//= require /finance/product/finance.product
//= require /finance/balanceDocument/finance.balanceDocument
//= require /finance/income/finance.income
//= require /finance/expense/finance.expense
//= require /finance/exchange/finance.exchange
//= require /finance/operation/finance.operation

angular.module("finance", [
    "finance.core",
    "finance.l10n",
    "finance.index",
    "finance.dashboard",
    "finance.account",
    "finance.company",
    "finance.product",
    "finance.balanceDocument",
    "finance.income",
    "finance.expense",
    "finance.exchange",
    "finance.operation",
    "ui.bootstrap"
]);
