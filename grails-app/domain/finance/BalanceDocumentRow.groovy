package finance

class BalanceDocumentRow {

    String accountName
    BigDecimal amount

    static belongsTo = [
            document: BalanceDocument
    ]

    static constraints = {
    }
}
