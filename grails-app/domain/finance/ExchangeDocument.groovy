package finance

class ExchangeDocument {

    Date date
    Account sourceAccount
    Account targetAccount
    BigDecimal amount
    String description
    DocumentStatus status

    Operation incomeOperation
    Operation expenseOperation

    static constraints = {
        incomeOperation nullable: true
        expenseOperation nullable: true
    }
}
