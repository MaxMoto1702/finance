package finance

class IncomeDocumentRow {

    String product
    BigDecimal amount

    static belongsTo = [
            document: IncomeDocument
    ]

    static constraints = {
    }
}
