package finance

import grails.transaction.Transactional

import java.time.Period

@Transactional
class ExpenseDocumentService {

    def process(ExpenseDocument document) {
        for (ExpenseDocumentRow row in document.rows) {
            def operation = new Operation(
                    product: row.product,
                    amount: row.amount,
                    account: document.account,
                    date: document.date,
                    period: Period.ofYears(document.date.getYear() + 1900),
                    type: OperationType.EXPENSE
            )
            if (operation.validate()) {
                operation.save flush: true
                row.operation = operation
                row.save(flush: true)
            } else {
                document.errors.reject('expenseDocument.process.notNotAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
        document.status = DocumentStatus.PROCESSED
        if (document.validate()) {
            document.save flush: true
        } else {
            transactionStatus.setRollbackOnly()
        }
    }

    def revoke(ExpenseDocument document) {
        for (ExpenseDocumentRow row in document.rows) {
            if (row.operation.closeDate == null) {
                def operation = row.operation
                row.operation = null
                row.save(flush: true)
                operation.delete(flush: true)
            } else {
                document.errors.reject('expenseDocument.revoke.notNotAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
        document.status = DocumentStatus.REVOKED
        if (document.validate()) {
            document.save flush: true
        } else {
            transactionStatus.setRollbackOnly()
        }
    }

    ExpenseDocument save(ExpenseDocument document) {
        document.status = DocumentStatus.CREATED
        def amount = document.rows.sum { ExpenseDocumentRow row -> row.amount }
        document.amount = amount as BigDecimal
        if (document.validate())
            document.save flush: true
        else
            log.error(document.errors)
    }

    def delete(ExpenseDocument document) {
        for (ExpenseDocumentRow row in document.rows) {
            if (row.operation) {
                document.errors.reject('expenseDocument.delete.notAllowed')
                transactionStatus.setRollbackOnly()
                return
            }
        }
//        document.delete(flush: true)
        document.status = DocumentStatus.DELETED
        if (document.validate()) {
            document.save flush: true
        } else {
            transactionStatus.setRollbackOnly()
        }
    }
}
