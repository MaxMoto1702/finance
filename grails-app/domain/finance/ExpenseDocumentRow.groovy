package finance

class ExpenseDocumentRow {

    String product
    BigDecimal amount

    Operation operation

    static belongsTo = [
            document: ExpenseDocument
    ]

    static constraints = {
        operation nullable: true
    }
}
