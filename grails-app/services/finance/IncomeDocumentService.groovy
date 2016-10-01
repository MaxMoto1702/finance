package finance

import grails.transaction.Transactional

import java.time.Period

@Transactional
class IncomeDocumentService {

    def process(IncomeDocument document) {
        for (IncomeDocumentRow row in document.rows) {
            def operation = new Operation(
                    product: row.product,
                    amount: row.amount,
                    account: document.account,
                    date: document.date,
                    period: Period.ofYears(document.date.getYear() + 1900),
                    type: OperationType.INCOME
            )
            if (operation.validate()) {
                operation.save flush: true
                row.operation = operation
                row.save(flush: true)
            } else {
                document.errors.reject('incomeDocument.processing.notNotAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
    }

    def rollback(IncomeDocument document) {
        for (IncomeDocumentRow row in document.rows) {
            if (row.operation.closeDate == null) {
                def operation = row.operation
                row.operation = null
                row.save(flush: true)
                operation.delete(flush: true)
            } else {
                document.errors.reject('incomeDocument.rollback.notNotAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
    }

    IncomeDocument save(IncomeDocument document) {
        def amount = document.rows.sum { IncomeDocumentRow row -> row.amount }
        document.amount = amount as BigDecimal
        if (document.validate()) document.save flush: true else log.error(document.errors)
    }

    def delete(IncomeDocument document) {
        for (IncomeDocumentRow row in document.rows) {
            if (row.operation) {
                document.errors.reject('incomeDocument.delete.notAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
        document.delete(flush: true)
    }
}
