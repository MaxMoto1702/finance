package finance

import grails.transaction.Transactional

import java.time.Period

@Transactional
class ExpenseDocumentService {

    def processing(ExpenseDocument document) {
        for (ExpenseDocumentRow row in document.rows) {
            def operation = new Operation(
                    product: row.product,
                    amount: row.amount,
                    account: document.account,
                    date: document.date,
                    period: Period.ofYears(document.date.getYear() + 1900),
                    type: OperationType.EXPENSE
            )
            operation.save flush: true
        }
    }

    ExpenseDocument save(ExpenseDocument document) {
        def amount = document.rows.sum { ExpenseDocumentRow row -> row.amount }
        document.amount = amount as BigDecimal
        if (document.validate()) document.save flush: true else log.error(document.errors)
    }

}
