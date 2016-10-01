package finance

class IncomeDocument {

    Date date
    Company company
    Account account
    BigDecimal amount
    String description
    DocumentStatus status

    static hasMany = [
            rows: IncomeDocumentRow
    ]

    static constraints = {
    }
}
