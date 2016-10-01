package finance

class IncomeDocumentRow {

    String productName
    BigDecimal amount

    Operation operation

    static belongsTo = [
            document: IncomeDocument
    ]

    static constraints = {
        operation nullable: true
    }
}
