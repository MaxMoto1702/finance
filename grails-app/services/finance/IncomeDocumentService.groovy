package finance

import grails.transaction.Transactional

import java.time.Period

@Transactional
class IncomeDocumentService {

    def processing(IncomeDocument document) {
        for (IncomeDocumentRow row in document.rows) {
            def operation = new Operation(
                    product: row.product,
                    amount: row.amount,
                    account: document.account,
                    date: document.date,
                    period: Period.ofYears(document.date.getYear() + 1900),
                    type: OperationType.INCOME
            )
            operation.save flush: true
        }
    }

    IncomeDocument save(IncomeDocument document) {
        def amount = document.rows.sum { IncomeDocumentRow row -> row.amount }
        document.amount = amount as BigDecimal
        if (document.validate()) document.save flush: true else log.error(document.errors)
    }

}
