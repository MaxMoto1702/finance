package finance

class BalanceDocument {

    Date date
    BigDecimal amount
    String description

    static hasMany = [
            rows: BalanceDocumentRow
    ]

    static constraints = {
    }
}
