package finance

class BalanceDocument {

    Date date
    BigDecimal amount
    String description
    DocumentStatus status

    static hasMany = [
            rows: BalanceDocumentRow
    ]

    static constraints = {
    }
}
