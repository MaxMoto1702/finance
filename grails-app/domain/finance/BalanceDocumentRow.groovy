package finance

class BalanceDocumentRow {

    String accountName
    BigDecimal amount

    Account account

    static belongsTo = [
            document: BalanceDocument
    ]

    static constraints = {
        account nullable: true
    }
}
