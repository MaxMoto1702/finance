package finance

class ExpenseDocument {

    Date date
    String companyName
    Account account
    BigDecimal amount
    String description
    DocumentStatus status

    static hasMany = [
            rows: ExpenseDocumentRow
    ]

    static constraints = {
    }
}
