package finance

class ExpenseDocumentRow {

    String productName
    BigDecimal amount

    Operation operation

    static belongsTo = [
            document: ExpenseDocument
    ]

    static constraints = {
        operation nullable: true
    }
}
