package finance

class IncomeDocument {

    Date date
    String companyName
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
