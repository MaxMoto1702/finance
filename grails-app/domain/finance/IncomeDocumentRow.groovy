package finance

class IncomeDocumentRow {

    String product
    BigDecimal amount

    Operation operation

    static belongsTo = [
            document: IncomeDocument
    ]

    static constraints = {
        operation nullable: true
    }
}
