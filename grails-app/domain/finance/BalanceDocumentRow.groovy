package finance

class BalanceDocumentRow {

    Account account
    BigDecimal amount

    static belongsTo = [
            document: BalanceDocument
    ]

    static constraints = {
    }
}
