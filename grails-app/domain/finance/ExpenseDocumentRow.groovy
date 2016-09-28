package finance

class ExpenseDocumentRow {

    String product
    BigDecimal amount

    static belongsTo = [
            document: ExpenseDocument
    ]

    static constraints = {
    }
}
