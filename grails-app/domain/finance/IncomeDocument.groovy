package finance

class IncomeDocument {

    Date date
    String company
    Account account
    BigDecimal amount
    String description

    static hasMany = [
            rows: IncomeDocumentRow
    ]

    static constraints = {
    }
}
